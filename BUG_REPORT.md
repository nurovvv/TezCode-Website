# TezCode Bug Report

## Critical Issues Found

### 1. **CRITICAL: Race Condition in Challenge XP Awards**  
**Location**: [server/src/routes/challenges.js](server/src/routes/challenges.js#L157-L217)  
**Severity**: CRITICAL  
**Impact**: Users can earn XP multiple times for the same challenge  

#### Problem
The POST `/api/challenges/:id/submit` endpoint has a race condition that allows duplicate XP awards:

```javascript
// Line 157-172: Check if user already passed
let alreadyPassed = null;
if (passedAll && req.user) {
    alreadyPassed = await ChallengeSubmission.findOne({
        where: {
            user_id: req.user.id,
            challenge_id: challenge.id,
            status: 'passed'
        }
    });
}

// Line 175-182: Record submission
if (req.user) {
    await ChallengeSubmission.create({
        code, language,
        status: passedAll ? 'passed' : 'failed',
        completedAt: new Date(),
        user_id: req.user.id,
        challenge_id: challenge.id
    });
}

// Line 184-194: Award XP (PROBLEM: based on stale check from line 157)
if (passedAll && req.user) {
    if (!alreadyPassed) {
        const user = await User.findByPk(req.user.id);
        if (user) {
            user.xp += challenge.xpReward;
            await user.save();
        }
    }
}
```

#### Race Condition Scenario
With concurrent requests (milliseconds apart):

1. **Request A** - Check if passed: `alreadyPassed = null` ✓
2. **Request B** - Check if passed: `alreadyPassed = null` ✓  
3. **Request A** - Create submission ✓
4. **Request A** - Award XP (passes check, no XP yet recorded) ✓
5. **Request B** - Create submission ✓
6. **Request B** - **Award XP again** (its check from step 2 is still null!) ✗ **BUG**

Result: User gets 2x XP for 1 challenge.

#### Root Cause
The "already passed" check (line 157) happens **before** the submission is recorded. Concurrent requests see the same empty state before either one creates the record.

#### Solution
Use one of these approaches:

**Option A: Transaction with Lock** (Recommended)
```javascript
// Use database transaction with pessimistic lock
const transaction = await sequelize.transaction();
try {
    // Check for existing passed submission WITH LOCK
    const alreadyPassed = await ChallengeSubmission.findOne({
        where: {
            user_id: req.user.id,
            challenge_id: challenge.id,
            status: 'passed'
        },
        transaction,
        lock: transaction.LOCK.UPDATE  // Pessimistic lock
    });

    if (!alreadyPassed) {
        // Safe to award XP within transaction
        await User.increment('xp', {
            by: challenge.xpReward,
            where: { id: req.user.id },
            transaction
        });
    }

    await ChallengeSubmission.create({
        code, language,
        status: passedAll ? 'passed' : 'failed',
        completedAt: new Date(),
        user_id: req.user.id,
        challenge_id: challenge.id
    }, { transaction });

    await transaction.commit();
} catch (err) {
    await transaction.rollback();
    throw err;
}
```

**Option B: Unique Constraint** (Simpler)
```javascript
// In models/index.js, add unique constraint to ChallengeSubmission:
const ChallengeSubmission = sequelize.define('ChallengeSubmission', { ... }, {
    indexes: [{
        fields: ['user_id', 'challenge_id'],
        unique: true,
        where: { status: 'passed' }  // Only one passed submission per user per challenge
    }]
});

// Then check after insert:
try {
    const submission = await ChallengeSubmission.create({ ... });
    if (submission && passedAll && req.user) {
        // Award XP only on successful new creation
        await User.increment('xp', {
            by: challenge.xpReward,
            where: { id: req.user.id }
        });
    }
} catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
        // Duplicate passed submission - don't award XP
        return res.json({ passed: true, message: 'Already completed' });
    }
    throw err;
}
```

---

### 2. **Missing Null Check on User After Auto-Award**
**Location**: [server/src/routes/challenges.js](server/src/routes/challenges.js#L208-L212)  
**Severity**: MEDIUM  
**Impact**: Silent failure if user record can't be found

#### Problem
```javascript
if (passedAll && req.user) {
    if (!alreadyPassed) {
        const user = await User.findByPk(req.user.id);
        if (user) {
            user.xp += challenge.xpReward;
            await user.save();
```

If `User.findByPk()` returns null (deleted user, corrupted data), XP award silently fails without error response.

#### Solution
```javascript
const user = await User.findByPk(req.user.id);
if (!user) {
    console.error(`User ${req.user.id} not found for XP award`);
    // Don't fail the submission, but log the issue
    // Consider alerting admin
} else {
    user.xp += challenge.xpReward;
    await user.save();
}
```

---

### 3. **Hardcoded CORS Wildcard Origin**
**Location**: [server/src/app.js](server/src/app.js) (if using wildcard CORS)  
**Severity**: MEDIUM  
**Impact**: Any domain can access your API, enables CSRF attacks

#### Problem
If configured with `origin: '*'`:
- Any external website can make requests to your API
- No CSRF protection
- Credentials may be exposed if not careful

#### Solution
Restrict CORS to known origins:
```javascript
const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
```

---

### 4. **XP Update Not Atomic**
**Location**: [server/src/routes/challenges.js](server/src/routes/challenges.js#L210-L211)  
**Severity**: MEDIUM  
**Impact**: Potential data loss if update fails mid-operation

#### Current Code
```javascript
user.xp += challenge.xpReward;  // In-memory operation
await user.save();              // Can fail, leaving memory state inconsistent
```

#### Solution
Use atomic database increment:
```javascript
await User.increment('xp', {
    by: challenge.xpReward,
    where: { id: req.user.id }
});
```

---

### 5. **Missing Input Validation**
**Location**: [server/src/routes/challenges.js](server/src/routes/challenges.js#L73-L76)  
**Severity**: LOW  
**Impact**: Potential code injection if code is displayed without sanitization

#### Problem
No validation on `req.params.id` (should be numeric):
```javascript
router.post('/:id/submit', authenticateOptional, async (req, res) => {
    // No validation that :id is a valid number
    const challenge = await Challenge.findByPk(req.params.id);
```

#### Solution
```javascript
const { body, param, validationResult } = require('express-validator');

router.post(
    '/:id(\\d+)/submit',  // Only digits
    authenticateOptional,
    body('language').isString().trim().notEmpty(),
    body('code').isString().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    async (req, res) => { ... }
);
```

---

## Summary Table

| Bug | Severity | Status | Impact |
|-----|----------|--------|--------|
| Race condition in XP awards | CRITICAL | ❌ Not Fixed | Users get 2x+ XP for single challenge |
| Missing user null check | MEDIUM | ❌ Not Fixed | Silent failure on user record issues |
| Wildcard CORS origin | MEDIUM | ⚠️ Depends on config | Security risk if enabled |
| Non-atomic XP update | MEDIUM | ❌ Not Fixed | Potential inconsistent state |
| Missing input validation | LOW | ❌ Not Fixed | Minor injection risk |

---

## Recommended Action Items

1. **URGENT**: Implement transaction-based fix for race condition
2. **HIGH**: Add proper error handling for user lookups
3. **HIGH**: Review and restrict CORS settings
4. **MEDIUM**: Switch to atomic increment operations
5. **LOW**: Add input validation middleware

---

## Testing Recommendations

**Race Condition Test**:
```bash
# Send 5 concurrent requests to same challenge endpoint
for i in {1..5}; do
  curl -X POST http://localhost:3000/api/challenges/1/submit \
    -H "Authorization: Bearer $TOKEN" \
    -d '{"language":"python","code":"...","localResults":{"passed":true}}' &
done
# Check if XP was awarded 5 times (bug) or 1 time (correct)
```

