const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d'
    });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check for user email
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if account is locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(401).json({
                message: `Account is locked. Try again after ${new Date(user.lockUntil).toLocaleString()}`
            });
        }

        // Check password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            await user.incrementLoginAttempts();
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Reset login attempts on successful login
        await user.resetLoginAttempts();

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.formattedDate,
                loginAttempts: user.loginAttempts
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    getProfile
}; 