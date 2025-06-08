const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter');

// Register route with validation
router.post(
    '/register',
    registerLimiter,
    [
        check('name', 'Name is required').not().isEmpty().trim(),
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('password', 'Password must be at least 8 characters long and contain at least one number')
            .isLength({ min: 8 })
            .matches(/\d/)
            .withMessage('Password must contain at least one number')
    ],
    register
);

// Login route with validation
router.post(
    '/login',
    loginLimiter,
    [
        check('email', 'Please include a valid email').isEmail().normalizeEmail(),
        check('password', 'Password is required').exists()
    ],
    login
);

// Get user profile route
router.get('/profile', protect, getProfile);

module.exports = router; 