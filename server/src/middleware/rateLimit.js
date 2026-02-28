const rateLimit = require('express-rate-limit');

const challengeSubmitLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || 900000), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
    message: 'Too many challenge submissions, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => req.user?.id || req.ip,
    skip: (req) => !req.user // Don't rate limit unauthenticated temporarily
});

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    skip: (req) => process.env.NODE_ENV === 'test'
});

module.exports = { challengeSubmitLimiter, apiLimiter };
