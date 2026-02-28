const errorHandler = (err, req, res, next) => {
    console.error('Error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        path: req.path,
        method: req.method,
        userId: req.user?.id
    });

    // Database errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ message: 'Duplicate entry' });
    }
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ 
            message: 'Validation failed', 
            errors: err.errors 
        });
    }

    // Transaction errors
    if (err.name === 'SequelizeConnectionRefusedError') {
        return res.status(503).json({ message: 'Database connection failed' });
    }

    // Auth errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
    }

    // Default
    const statusCode = err.statusCode || 500;
    const message = process.env.NODE_ENV === 'development' 
        ? err.message 
        : 'An error occurred';

    res.status(statusCode).json({ message });
};

module.exports = errorHandler;
