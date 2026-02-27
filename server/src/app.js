const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config/env');

const app = express();

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
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', db: 'sqlite', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', (req, res, next) => {
    require('./routes/auth')(req, res, next);
});
app.use('/api/courses', (req, res, next) => {
    require('./routes/courses')(req, res, next);
});
app.use('/api/progress', (req, res, next) => {
    require('./routes/progress')(req, res, next);
});
app.use('/api/run-python', require('./routes/runPython'));

app.use('/api/challenges', (req, res, next) => {
    require('./routes/challenges')(req, res, next);
});
app.use('/api/leaderboard', (req, res, next) => {
    require('./routes/leaderboard')(req, res, next);
});
app.use('/api/dashboard', require('./routes/dashboard'));

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
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
        await sequelize.sync({ alter: true }); // Creates tables if they don't exist
        console.log('✅ SQLite database connected & synced');

        // Automated production seeding
        const challengeCount = await Challenge.count();
        if (challengeCount === 0) {
            console.log('🌱 Database is empty. Seeding challenges...');
            const seedChallenges = require('./seed_challenges');
            await seedChallenges();
        }

        const courseCount = await Course.count();
        if (courseCount === 0) {
            console.log('🌱 Course structure missing. Synchronizing...');
            const syncCourseStructure = require('../sync_structure');
            await syncCourseStructure();
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
