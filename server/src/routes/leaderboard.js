const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Get top users globally
router.get('/', async (req, res) => {
    try {
        const topUsers = await User.findAll({
            order: [['xp', 'DESC']],
            limit: 50,
            attributes: ['id', 'name', 'avatarUrl', 'level', 'xp']
        });

        res.json(topUsers);
    } catch (err) {
        console.error('Error fetching leaderboard:', err);
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
});

module.exports = router;
