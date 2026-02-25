const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const config = require('./config/env');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

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
        const { sequelize } = require('./models');
        await sequelize.authenticate();
        await sequelize.sync(); // Creates tables if they don't exist
        console.log('✅ SQLite database connected & synced');

        app.listen(config.port, () => {
            console.log(`🚀 TezCode server on http://localhost:${config.port}`);
        });
    } catch (err) {
        console.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}

start();
