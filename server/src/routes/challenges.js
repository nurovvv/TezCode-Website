const express = require('express');
const router = express.Router();
const { Challenge, ChallengeSubmission, ChallengeSolutionView, User, sequelize } = require('../models');
const { authenticate, authenticateOptional } = require('../middleware/auth');
const { validateChallengeSubmission, validateChallenge } = require('../middleware/validation');
const { challengeSubmitLimiter } = require('../middleware/rateLimit');

// Get all challenges
router.get('/', authenticateOptional, async (req, res) => {
    try {
        const challenges = await Challenge.findAll({
            attributes: ['id', 'title', 'difficulty', 'xpReward'],
            order: [
                [sequelize.literal(`CASE 
                    WHEN difficulty = 'easy' THEN 1 
                    WHEN difficulty = 'medium' THEN 2 
                    WHEN difficulty = 'hard' THEN 3 
                    ELSE 4 END`), 'ASC'],
                ['id', 'ASC']
            ]
        });

        // Check completion for current user
        let completedIds = new Set();
        if (req.user) {
            const submissions = await ChallengeSubmission.findAll({
                where: {
                    user_id: req.user.id,
                    status: 'passed'
                },
                attributes: ['challenge_id']
            });
            completedIds = new Set(submissions.map(s => s.challenge_id));
        }

        const challengesWithStatus = challenges.map(c => ({
            ...c.toJSON(),
            completed: completedIds.has(c.id)
        }));

        res.json(challengesWithStatus);
    } catch (err) {
        console.error('Error fetching challenges:', err);
        res.status(500).json({ message: 'Failed to fetch challenges' });
    }
});

// Get a specific challenge
router.get('/:id', validateChallenge, authenticateOptional, async (req, res) => {
    try {
        const challenge = await Challenge.findByPk(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        // Check if user already completed this
        let completed = null;
        if (req.user) {
            completed = await ChallengeSubmission.findOne({
                where: {
                    user_id: req.user.id,
                    challenge_id: req.params.id,
                    status: 'passed'
                }
            });
        }

        // Check if user already viewed the solution
        let solutionViewed = false;
        if (req.user) {
            const view = await ChallengeSolutionView.findOne({
                where: { user_id: req.user.id, challenge_id: req.params.id }
            });
            solutionViewed = !!view;
        }

        res.json({
            ...challenge.toJSON(),
            completed: !!completed,
            solutionViewed
        });
    } catch (err) {
        console.error('Error fetching challenge:', err);
        res.status(500).json({ message: 'Failed to fetch challenge' });
    }
});

// Submit a solution - FIXED VERSION WITH RACE CONDITION PREVENTION
router.post('/:id/submit', authenticateOptional, challengeSubmitLimiter, validateChallengeSubmission, async (req, res) => {
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
                // Check if user has viewed the solution
                const hasViewedSolution = await ChallengeSolutionView.findOne({
                    where: {
                        user_id: req.user.id,
                        challenge_id: challenge.id
                    },
                    transaction
                });

                if (hasViewedSolution) {
                    console.log(`User ${req.user.id} viewed solution for challenge ${challenge.id}. No XP awarded.`);
                } else {
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

// Get user's submissions for a specific challenge
router.get('/:id/submissions', validateChallenge, authenticate, async (req, res) => {
    try {
        const submissions = await ChallengeSubmission.findAll({
            where: {
                user_id: req.user.id,
                challenge_id: req.params.id
            },
            attributes: ['id', 'language', 'code', 'status', 'completedAt', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });
        res.json(submissions);
    } catch (err) {
        console.error('Error fetching submissions:', err);
        res.status(500).json({ message: 'Failed to fetch submissions' });
    }
});

// Unlock/Get solution for a challenge
router.get('/:id/solution', authenticate, async (req, res) => {
    try {
        const challenge = await Challenge.findByPk(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        // Record the view if not already recorded
        await ChallengeSolutionView.findOrCreate({
            where: {
                user_id: req.user.id,
                challenge_id: challenge.id
            }
        });

        res.json({
            solution: challenge.solution || "No solution available for this problem yet.",
            xpReward: challenge.xpReward
        });
    } catch (err) {
        console.error('Error fetching solution:', err);
        res.status(500).json({ message: 'Failed to fetch solution' });
    }
});

module.exports = router;
