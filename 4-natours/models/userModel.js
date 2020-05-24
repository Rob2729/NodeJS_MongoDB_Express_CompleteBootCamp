const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User must have a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your Email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid Email']
    },
    photo: {
        type: String
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 8
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            //THIS ONLY WORKS ON SAVE!!!
            validator: function (el) {
                return el === this.password;
            },
            message: 'Passwords do not match'
        }
    }
});

userSchema.pre('save', async function (next) {
    //only run this function is the password has been modified
    if (!this.isModified('password')) return next();

    //hash the password with a cost of 12.
    this.password = await bcrypt.hash(this.password, 12);

    //delete the passConfirm field
    this.passwordConfirm = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;