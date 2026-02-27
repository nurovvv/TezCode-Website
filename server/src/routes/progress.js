const express = require('express');
const { UserProgress, Activity, User } = require('../models');
const { authenticate, authenticateOptional } = require('../middleware/auth');

const router = express.Router();

// Submit activity progress
router.post('/', authenticateOptional, async (req, res) => {
    try {
        if (!req.user) {
            return res.json({ message: 'Progress not saved (Guest)' });
        }
        const { activityId, activitySlug, completed, score } = req.body;
        const finalSlug = activitySlug || activityId;

        let targetActivityId = null;
        let activity = null;

        // Try lookup by Slug first if it's a string, or by ID if it's a number
        if (typeof finalSlug === 'string') {
            activity = await Activity.findOne({ where: { slug: finalSlug } });
        } else if (typeof finalSlug === 'number') {
            activity = await Activity.findByPk(finalSlug);
        }

        if (activity) {
            targetActivityId = activity.id;
        } else if (typeof finalSlug === 'string') {
            // Create on the fly if it's a slug
            const newActivity = await Activity.create({ slug: finalSlug, type: 'lesson' });
            targetActivityId = newActivity.id;
            activity = newActivity;
        } else {
            return res.status(400).json({ message: 'Invalid activity identification' });
        }

        const [progress, created] = await UserProgress.findOrCreate({
            where: { user_id: req.user.id, activity_id: targetActivityId },
            defaults: { completed, score, completedAt: completed ? new Date() : null },
        });

        if ((created || !progress.completed) && completed) {
            if (!created) {
                progress.completed = true;
                progress.score = score;
                progress.completedAt = new Date();
                await progress.save();
            }

            // Award XP & Update Streak
            if (activity) {
                const user = await User.findByPk(req.user.id);
                if (user) {
                    const isCourseActivity = ['lesson', 'reading'].includes(activity.type);
                    let xpIncrement = isCourseActivity ? 0 : (activity.xpReward || 10);
                    let newStreak = user.streak || 0;
                    const now = new Date();
                    const lastActivity = user.lastActivityAt ? new Date(user.lastActivityAt) : null;

                    if (!lastActivity) {
                        newStreak = 1;
                    } else {
                        const diffDays = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
                        if (diffDays === 1) {
                            newStreak += 1;
                        } else if (diffDays > 1) {
                            newStreak = 1;
                        }
                    }

                    await user.update({
                        xp: user.xp + xpIncrement,
                        streak: newStreak,
                        lastActivityAt: now
                    });
                }
            }
        }

        res.json(progress);
    } catch (err) {
        console.error('Save progress error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get user's progress for a course/section
router.get('/user/:userId', authenticate, async (req, res) => {
    try {
        const progress = await UserProgress.findAll({
            where: { user_id: req.params.userId },
            include: [{ model: Activity, attributes: ['id', 'type', 'xpReward', 'section_id'] }],
        });
        res.json(progress);
    } catch (err) {
        console.error('Get progress error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
