const express = require('express');
const router = express.Router();
const { Challenge, ChallengeSubmission, User, sequelize } = require('../models');
const { authenticate } = require('../middleware/auth');

// Get all challenges
router.get('/', authenticate, async (req, res) => {
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
        const submissions = await ChallengeSubmission.findAll({
            where: {
                user_id: req.user.id,
                status: 'passed'
            },
            attributes: ['challenge_id']
        });

        const completedIds = new Set(submissions.map(s => s.challenge_id));

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
router.get('/:id', authenticate, async (req, res) => {
    try {
        const challenge = await Challenge.findByPk(req.params.id);
        if (!challenge) {
            return res.status(404).json({ message: 'Challenge not found' });
        }

        // Check if user already completed this
        const completed = await ChallengeSubmission.findOne({
            where: {
                user_id: req.user.id,
                challenge_id: req.params.id,
                status: 'passed'
            }
        });

        res.json({
            ...challenge.toJSON(),
            completed: !!completed
        });
    } catch (err) {
        console.error('Error fetching challenge:', err);
        res.status(500).json({ message: 'Failed to fetch challenge' });
    }
});

// Submit a solution
router.post('/:id/submit', authenticate, async (req, res) => {
    try {
        const { language, code, localResults } = req.body;
        console.log(`Submitting challenge ${req.params.id} for user ${req.user.id} in ${language}`);

        const challenge = await Challenge.findByPk(req.params.id);

        if (!challenge) {
            console.error(`Challenge ${req.params.id} not found`);
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
                // ... (existing Piston logic, keeping it as fallback)
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
                    const passed = output === expected && data.run.code === 0 && !stderr;

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
        // Record submission
        await ChallengeSubmission.create({
            code,
            language,
            status: passedAll ? 'passed' : 'failed',
            completedAt: new Date(),
            user_id: req.user.id,
            challenge_id: challenge.id
        });

        if (passedAll) {
            const user = await User.findByPk(req.user.id);
            if (user) {
                user.xp += challenge.xpReward;
                await user.save();
                console.log(`Awarded ${challenge.xpReward} XP to user ${user.name}`);
            }
        }

        res.json({
            passed: passedAll,
            results,
            message: passedAll ? 'Success! All test cases passed.' : 'Failed. Some test cases did not pass.'
        });

    } catch (err) {
        console.error('Error submitting challenge:', err);
        res.status(500).json({ message: 'Failed to evaluate challenge code: ' + err.message });
    }
});

module.exports = router;
