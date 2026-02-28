const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config/env');

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');
const challengeRoutes = require('./routes/challenges');
const leaderboardRoutes = require('./routes/leaderboard');
const runPythonRoutes = require('./routes/runPython');
const dashboardRoutes = require('./routes/dashboard');

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Static files for uploads
const uploadsDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Health check
app.get('/api/health', (req, res) => {
    const { sequelize } = require('./models');
    res.json({
        status: 'ok',
        db: sequelize.getDialect(),
        timestamp: new Date().toISOString()
    });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/run-python', runPythonRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ message: err.message || 'Internal server error' });
});

// Start
async function start() {
    try {
        // Ensure data directory exists
        const dataDir = path.join(__dirname, '../data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        // Import models to connect & sync
        const { sequelize, Challenge, Course } = require('./models');
        await sequelize.authenticate();
        await sequelize.sync(); // Creates tables if they don't exist
        console.log(`✅ ${sequelize.getDialect().toUpperCase()} database connected & synced`);

        // Automated production seeding
        console.log('🌱 Synchronizing challenges database...');
        const seedChallenges = require('./seed_challenges');
        await seedChallenges();

        const courseCount = await Course.count();
        if (courseCount === 0) {
            console.log('🌱 Course structure missing. Synchronizing...');
            const syncCourseStructure = require('../sync_structure');
            await syncCourseStructure();
        }

        // Automatic XP Recalculation
        console.log('🔄 Verifying user XP totals...');
        try {
            const { User, ChallengeSubmission } = require('./models');
            const users = await User.findAll();
            const allChallenges = await Challenge.findAll();
            const xpMap = {};
            allChallenges.forEach(c => { xpMap[c.id] = c.xpReward; });

            for (const user of users) {
                const passedSubmissions = await ChallengeSubmission.findAll({
                    where: { user_id: user.id, status: 'passed' },
                    attributes: ['challenge_id'],
                    group: ['challenge_id']
                });

                let calculatedXP = 0;
                for (const sub of passedSubmissions) {
                    if (xpMap[sub.challenge_id]) calculatedXP += xpMap[sub.challenge_id];
                }

                if (calculatedXP > user.xp) {
                    user.xp = calculatedXP;
                    await user.save();
                    console.log(`-> Fixed XP for user ${user.username}: ${calculatedXP} XP`);
                }
            }
        } catch (e) {
            console.error('Failed to recalculate XP:', e.message);
        }

        app.listen(config.port, () => {
            console.log(`🚀 TezCode server on http://localhost:${config.port}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}

start();
