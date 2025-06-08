const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Increased to 50 attempts
    message: {
        error: 'Too many login attempts, please try again after 15 minutes'
    }
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // Increased to 30 attempts
    message: {
        error: 'Too many accounts created, please try again after an hour'
    }
});

module.exports = {
    loginLimiter,
    registerLimiter
}; 