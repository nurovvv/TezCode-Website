// FIXED VERSION: server/src/routes/challenges.js (lines 73-220)
// This version implements transaction-based atomic operations to prevent race conditions

const express = require('express');
const router = express.Router();
const { Challenge, ChallengeSubmission, User, sequelize } = require('../models');
const { authenticate, authenticateOptional } = require('../middleware/auth');

// Reuse existing GET routes... [unchanged]

// Submit a solution - FIXED VERSION WITH RACE CONDITION PREVENTION
router.post('/:id/submit', authenticateOptional, async (req, res) => {
    let transaction = null;
    
    try {
        const { language, code, localResults } = req.body;
        console.log(`Submitting challenge ${req.params.id} for user ${req.user ? req.user.id : 'GUEST'} in ${language}`);

        // START CRITICAL SECTION: Use transaction to prevent race conditions
        transaction = await sequelize.transaction();

        const challenge = await Challenge.findByPk(req.params.id, { transaction });

        if (!challenge) {
            console.error(`Challenge ${req.params.id} not found`);
            await transaction.rollback();
            return res.status(404).json({ message: 'Challenge not found' });
        }

        let passedAll = false;
        let results = [];

        if (localResults) {
            console.log('Using local results provided by frontend');
            passedAll = localResults.passed;
            results = localResults.results;
        } else {
            // Backend evaluation logic remains same...
            passedAll = true;
            const testCases = challenge.testCases || [];
            console.log(`Running backend evaluation for ${testCases.length} test cases (deprecated)`);

            for (const tc of testCases) {
                try {
                    const response = await fetch('https://emkc.org/api/v2/piston/execute', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            language: language,
                            version: '*',
                            files: [{ content: code }],
                            stdin: tc.input || ""
                        })
                    });

                    const data = await response.json();
                    if (data.message) throw new Error(data.message);

                    const output = data.run.stdout ? data.run.stdout.trim() : "";
                    const stderr = data.run.stderr ? data.run.stderr.trim() : "";
                    const expected = tc.expectedOutput ? tc.expectedOutput.trim() : "";

                    const normalizeLines = (str) => String(str).split('\n').map(l => l.trim()).filter(l => l.length > 0).join('\n');
                    const normalizeForm = (val) => {
                        let s = normalizeLines(val)
                            .replace(/\s+/g, ' ')
                            .replace(/\(\s*/g, '[')
                            .replace(/\s*\)/g, ']')
                            .replace(/,\s*/g, ', ')
                            .replace(/\[\s+/g, '[')
                            .replace(/\s+\]/g, ']')
                            .replace(/'/g, '"')
                            .replace(/\b(true|false|none|null)\b/gi, (m) => m.toLowerCase())
                            .replace(/\bnull\b/g, 'none');
                        return s.trim();
                    };

                    const normA = normalizeForm(output);
                    const normE = normalizeForm(expected);

                    let passed = normA === normE;

                    if (!passed) {
                        try {
                            const numA = parseFloat(normA);
                            const numE = parseFloat(normE);
                            if (!isNaN(numA) && !isNaN(numE) && Math.abs(numA - numE) < 1e-6) {
                                passed = true;
                            }
                        } catch (e) { }
                    }

                    if (!passed && normA.toLowerCase() === normE.toLowerCase() && ['true', 'false', 'none'].includes(normA.toLowerCase())) {
                        passed = true;
                    }

                    passed = passed && data.run.code === 0 && !stderr;

                    results.push({
                        input: tc.input,
                        expectedOutput: expected,
                        actualOutput: stderr || output,
                        passed
                    });

                    if (!passed) passedAll = false;
                } catch (pistonErr) {
                    console.error('Piston evaluation failed:', pistonErr.message);
                    passedAll = false;
                    results.push({
                        input: tc.input,
                        expectedOutput: tc.expectedOutput,
                        actualOutput: 'Evaluation Error: ' + pistonErr.message,
                        passed: false
                    });
                }
            }
        }

        console.log(`Challenge result: ${passedAll ? 'PASSED ALL' : 'FAILED SOME'}`);

        // CRITICAL FIX: Check and award XP within same transaction with lock
        // This prevents concurrent requests from both awarding XP
        let xpAwarded = false;
        
        if (passedAll && req.user) {
            // Check if user already has a passed submission for this challenge WITH EXCLUSIVE LOCK
            const existingPassed = await ChallengeSubmission.findOne({
                where: {
                    user_id: req.user.id,
                    challenge_id: challenge.id,
                    status: 'passed'
                },
                transaction,
                lock: {
                    level: transaction.LOCK.UPDATE // Pessimistic lock - blocks concurrent reads
                }
            });

            if (!existingPassed) {
                // Safe: Only this transaction can reach here
                // Award XP using atomic increment
                const updateResult = await User.increment('xp', {
                    by: challenge.xpReward,
                    where: { id: req.user.id },
                    transaction
                });

                if (updateResult && updateResult[0] && updateResult[0][1] > 0) {
                    xpAwarded = true;
                    console.log(`Awarded ${challenge.xpReward} XP to user ${req.user.id}`);
                } else {
                    console.error(`Failed to increment XP for user ${req.user.id}`);
                    await transaction.rollback();
                    return res.status(500).json({ message: 'Failed to award XP' });
                }
            } else {
                console.log(`User ${req.user.id} already completed challenge ${challenge.id}, no XP awarded.`);
            }
        }

        // Record submission (always record, regardless of XP award)
        if (req.user) {
            await ChallengeSubmission.create({
                code,
                language,
                status: passedAll ? 'passed' : 'failed',
                completedAt: new Date(),
                user_id: req.user.id,
                challenge_id: challenge.id
            }, { transaction });
        }

        // Commit transaction - all or nothing
        await transaction.commit();

        res.json({
            passed: passedAll,
            results,
            xpAwarded,
            message: passedAll ? 'Success! All test cases passed.' : 'Failed. Some test cases did not pass.'
        });

    } catch (err) {
        // Rollback on any error
        if (transaction) {
            try {
                await transaction.rollback();
            } catch (rollbackErr) {
                console.error('Error rolling back transaction:', rollbackErr);
            }
        }
        
        console.error('Error submitting challenge:', err);
        res.status(500).json({ 
            message: 'Failed to evaluate challenge code: ' + err.message 
        });
    }
});

// Rest of the routes remain unchanged...
module.exports = router;
