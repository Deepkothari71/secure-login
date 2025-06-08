const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Custom date formatter
const formatDate = (date) => {
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    return date.toLocaleString('en-US', options);
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true
    },
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: String,
        default: null
    },
    createdAt: {
        type: String,
        default: () => formatDate(new Date())
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual for formatted date
userSchema.virtual('formattedDate').get(function() {
    return this.createdAt; // Already formatted when saved
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(15);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to check password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to increment login attempts
userSchema.methods.incrementLoginAttempts = async function() {
    if (this.lockUntil && new Date(this.lockUntil) > new Date()) {
        return;
    }
    this.loginAttempts += 1;
    if (this.loginAttempts >= 5) {
        const lockTime = new Date();
        lockTime.setHours(lockTime.getMinutes() + 5); // Lock for 2 minutes
        
        this.lockUntil = formatDate(lockTime);
    }
    await this.save();
};

// Method to reset login attempts
userSchema.methods.resetLoginAttempts = async function() {
    this.loginAttempts = 0;
    this.lockUntil = null;
    await this.save();
};

module.exports = mongoose.model('User', userSchema); 