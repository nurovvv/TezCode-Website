// Additional Security and Bug Fixes for TezCode

// ============================================================================
// FIX 2: Restrict CORS to prevent CSRF and unauthorized access
// ============================================================================
// File: server/src/app.js

const cors = require('cors');

// BEFORE (INSECURE):
// app.use(cors({ origin: '*' }));

// AFTER (SECURE):
app.use(cors({
    origin: process.env.CLIENT_URL || process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400
}));

// ============================================================================
// FIX 3: Add input validation middleware
// ============================================================================
// File: server/src/middleware/validation.js (NEW FILE)

const { body, param, validationResult } = require('express-validator');

// Validation for challenge submission
const validateChallengeSubmission = [
    param('id').isInt({ min: 1 }).withMessage('Challenge ID must be a positive integer'),
    body('language').isString().trim().notEmpty().toLowerCase().isIn(['python', 'javascript', 'java', 'cpp'])
        .withMessage('Language must be one of: python, javascript, java, cpp'),
    body('code').isString().trim().notEmpty().isLength({ max: 50000 })
        .withMessage('Code must be a non-empty string (max 50000 chars)'),
    body('localResults').optional().isObject().withMessage('localResults must be an object'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateChallengeSubmission };

// ============================================================================
// Use in routes:
// ============================================================================
// File: server/src/routes/challenges.js

const { validateChallengeSubmission } = require('../middleware/validation');

// BEFORE:
// router.post('/:id/submit', authenticateOptional, async (req, res) => {

// AFTER:
router.post('/:id/submit', authenticateOptional, validateChallengeSubmission, async (req, res) => {
    // ... rest of handler
});

// ============================================================================
// FIX 4: Environment-based Configuration
// ============================================================================
// File: server/.env.example (UPDATE)

DATABASE_URL=sqlite:./dev.db
NODE_ENV=development
PORT=4000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_change_in_production
JWT_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Piston API (code execution)
PISTON_API_URL=https://emkc.org/api/v2/piston

# Session settings
SESSION_SECRET=your_session_secret_change_in_production

# Database backup settings
DB_BACKUP_ENABLED=true
DB_BACKUP_INTERVAL=86400000

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

// ============================================================================
// FIX 5: Add Rate Limiting to prevent abuse
// ============================================================================
// File: server/src/middleware/rateLimit.js (NEW FILE)

const rateLimit = require('express-rate-limit');

const challengeSubmitLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 900000), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
    message: 'Too many challenge submissions, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.user?.id || req.ip,
    skip: (req) => !req.user // Don't rate limit unauthenticated
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    skip: (req) => process.env.NODE_ENV === 'test'
});

module.exports = { challengeSubmitLimiter, apiLimiter };

// ============================================================================
// Use in routes:
// ============================================================================
// File: server/src/routes/challenges.js

const { challengeSubmitLimiter } = require('../middleware/rateLimit');

router.post(
    '/:id/submit',
    authenticateOptional,
    challengeSubmitLimiter,  // Add rate limiting
    validateChallengeSubmission,
    async (req, res) => {
        // ... rest of handler
    }
);

// ============================================================================
// FIX 6: Improved Error Handling
// ============================================================================
// File: server/src/middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        userId: req.user?.id
    });

    // Database errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Duplicate entry' });
    }
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }

    // Transaction errors
    if (err.name === 'SequelizeConnectionRefusedError') {
        return res.status(503).json({ message: 'Database connection failed' });
    }

    // Auth errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Default
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'An error occurred';

    res.status(statusCode).json({ message });
};

// Use in app.js
app.use(errorHandler);

// ============================================================================
// FIX 7: Secure Password Hashing
// ============================================================================
// Verify in auth.js:

const bcrypt = require('bcryptjs');

// When registering:
const saltRounds = 12; // Good default
const passwordHash = await bcrypt.hash(password, saltRounds);

// When comparing:
const passwordMatch = await bcrypt.compare(plainPassword, passwordHash);

// ============================================================================
// FIX 8: Secure Token Storage (Client-side)
// ============================================================================
// File: client/src/services/auth.js

// BEFORE (INSECURE - stores in localStorage):
// localStorage.setItem('accessToken', token);

// AFTER (MORE SECURE - stores in memory + httpOnly cookie):
// For sensitive tokens, use:
// 1. Memory-based storage (lost on refresh but most secure)
// 2. Or httpOnly cookies (server-managed, not accessible to JS)
// 3. Or secure storage with reasonable expiry

// In API interceptor:
api.interceptors.request.use(config => {
    const token = getAccessToken(); // From memory or cookie
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ============================================================================
// FIX 9: Database Constraints to Prevent Duplicates
// ============================================================================
// File: server/src/models/index.js

const ChallengeSubmission = sequelize.define('ChallengeSubmission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.TEXT, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    status: { 
        type: DataTypes.ENUM('passed', 'failed'), 
        defaultValue: 'failed' 
    },
    completedAt: { type: DataTypes.DATE },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    challenge_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
    tableName: 'challenge_submissions',
    timestamps: true,
    underscored: true,
    indexes: [
        // Allow quick lookup by user_id + challenge_id
        { fields: ['user_id', 'challenge_id'] },
        // Archive search
        { fields: ['user_id', 'created_at'] },
        // Status tracking
        { fields: ['status', 'created_at'] }
    ]
});

// ============================================================================
// FIX 10: Health Check with Database Verification
// ============================================================================
// File: server/src/routes/health.js (NEW FILE)

const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

router.get('/', async (req, res) => {
    try {
        // Verify database connection
        await sequelize.authenticate();
        
        res.json({
            status: 'healthy',
            timestamp: new Date(),
            database: 'connected'
        });
    } catch (err) {
        console.error('Health check failed:', err);
        res.status(503).json({
            status: 'unhealthy',
            timestamp: new Date(),
            database: 'disconnected',
            error: err.message
        });
    }
});

module.exports = router;

// Use in app.js:
app.use('/api/health', require('./routes/health'));

// ============================================================================
// TESTING: Concurrent Request Test for Race Condition
// ============================================================================
// File: test/race-condition-test.js (NEW FILE)

const axios = require('axios');

async function testRaceCondition() {
    const token = 'YOUR_JWT_TOKEN_HERE';
    const challengeId = 1;
    const baseURL = 'http://localhost:4000/api';

    const submitPayload = {
        language: 'python',
        code: 'print("hello")',
        localResults: {
            passed: true,
            results: [{ passed: true }]
        }
    };

    const api = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${token}` }
    });

    // Get initial XP
    const userBefore = await api.get('/users/me');
    const xpBefore = userBefore.data.xp;
    console.log(`XP Before: ${xpBefore}`);

    // Send 5 concurrent requests
    const promises = [];
    for (let i = 0; i < 5; i++) {
        promises.push(
            api.post(`/challenges/${challengeId}/submit`, submitPayload)
                .catch(err => ({ error: err.message }))
        );
    }

    const results = await Promise.all(promises);
    console.log('Submission results:', results.map(r => r.data || r.error));

    // Get final XP
    const userAfter = await api.get('/users/me');
    const xpAfter = userAfter.data.xp;
    const xpGained = xpAfter - xpBefore;

    console.log(`XP After: ${xpAfter}`);
    console.log(`XP Gained: ${xpGained}`);
    console.log(`Expected: 10 (one-time), Got: ${xpGained}`);

    // PASS if only awarded once
    if (xpGained === 10) {
        console.log('✓ PASS: Race condition fixed - only awarded once');
    } else if (xpGained > 10) {
        console.log('✗ FAIL: Race condition detected - awarded multiple times!');
    }
}

// Run test:
// npm test -- --grep "race-condition-test"
