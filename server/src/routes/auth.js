const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config/env');
const { User, RefreshToken } = require('../models');
const { authenticate } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../../public/uploads');
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'avatar-' + req.user.id + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only JPEG, PNG and WebP images are allowed'));
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const passwordHash = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email,
            passwordHash,
            role: role || 'student',
        });

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        const refreshToken = crypto.randomBytes(64).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await RefreshToken.create({
            user_id: user.id,
            token: refreshToken,
            expiresAt,
        });

        res.status(201).json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl,
                githubUrl: user.githubUrl,
                linkedinUrl: user.linkedinUrl,
                twitterUrl: user.twitterUrl,
                instagramUrl: user.instagramUrl,
                xp: user.xp,
                level: user.level,
            },
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        const refreshToken = crypto.randomBytes(64).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await RefreshToken.create({
            user_id: user.id,
            token: refreshToken,
            expiresAt,
        });

        res.json({
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatarUrl: user.avatarUrl,
                githubUrl: user.githubUrl,
                linkedinUrl: user.linkedinUrl,
                twitterUrl: user.twitterUrl,
                xp: user.xp,
                level: user.level,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Refresh token
router.post('/refresh', async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token required' });
        }

        const stored = await RefreshToken.findOne({
            where: { token: refreshToken },
            include: [User],
        });

        if (!stored || stored.expiresAt < new Date()) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        const accessToken = jwt.sign(
            { id: stored.User.id, email: stored.User.email, role: stored.User.role },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );

        res.json({ accessToken });
    } catch (err) {
        console.error('Refresh error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get current user
router.get('/me', authenticate, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email', 'role', 'xp', 'level', 'avatarUrl', 'githubUrl', 'linkedinUrl', 'twitterUrl', 'instagramUrl', 'langPreference'],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (err) {
        console.error('Get user error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update profile
router.put('/profile', authenticate, async (req, res) => {
    try {
        const { name, avatarUrl, githubUrl, linkedinUrl, twitterUrl, instagramUrl } = req.body;
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;
        if (githubUrl !== undefined) user.githubUrl = githubUrl;
        if (linkedinUrl !== undefined) user.linkedinUrl = linkedinUrl;
        if (twitterUrl !== undefined) user.twitterUrl = twitterUrl;
        if (instagramUrl !== undefined) user.instagramUrl = instagramUrl;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                githubUrl: user.githubUrl,
                linkedinUrl: user.linkedinUrl,
                twitterUrl: user.twitterUrl,
                xp: user.xp,
                level: user.level,
            }
        });
    } catch (err) {
        console.error('Update profile error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Upload avatar
router.post('/upload-avatar', authenticate, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate URL (assuming the server is running on a port and /uploads is static)
        // In a real production app, you might use a cloud storage provider
        const avatarUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        user.avatarUrl = avatarUrl;
        await user.save();

        res.json({
            message: 'Avatar uploaded successfully',
            avatarUrl: avatarUrl
        });
    } catch (err) {
        console.error('Avatar upload error:', err);
        res.status(500).json({ message: err.message || 'Server error' });
    }
});

module.exports = router;
