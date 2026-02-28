const { body, param, validationResult } = require('express-validator');

const validateChallengeSubmission = [
    param('id').isInt({ min: 1 }).withMessage('Challenge ID must be a positive integer'),
    body('language')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Language is required'),
    body('code')
        .isString()
        .trim()
        .notEmpty()
        .isLength({ max: 50000 })
        .withMessage('Code must be a non-empty string (max 50000 chars)'),
    body('localResults')
        .optional()
        .isObject()
        .withMessage('localResults must be an object'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors.array() 
            });
        }
        next();
    }
];

const validateChallenge = [
    param('id').isInt({ min: 1 }).withMessage('Challenge ID must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                message: 'Validation failed',
                errors: errors.array() 
            });
        }
        next();
    }
];

module.exports = { validateChallengeSubmission, validateChallenge };
