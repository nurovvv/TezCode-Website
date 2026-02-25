const express = require('express');
const { UserProgress, Activity, User } = require('../models');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Submit activity progress
router.post('/', authenticate, async (req, res) => {
    try {
        const { activityId, completed, score } = req.body;

        const [progress, created] = await UserProgress.findOrCreate({
            where: { user_id: req.user.id, activity_id: activityId },
            defaults: { completed, score, completedAt: completed ? new Date() : null },
        });

        if (!created && !progress.completed && completed) {
            progress.completed = true;
            progress.score = score;
            progress.completedAt = new Date();
            await progress.save();

            // Award XP
            const activity = await Activity.findByPk(activityId);
            if (activity) {
                await User.increment('xp', { by: activity.xpReward, where: { id: req.user.id } });
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
