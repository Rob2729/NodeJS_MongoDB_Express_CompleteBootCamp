const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
    role: {
        type: String,
        enum: ['user', 'guide', 'lead-guide', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
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
    },
    passwordChangedAt: {
        type: Date
    },
    passwordResetToken: {
        type: String
    },
    passwordResetExpires: {
        type: Date
    },
    active: {
        type: Boolean,
        default: true,
        select: false
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password') || this.isNew) return next();

    //the line below ensures that the token has been created after the password has changed. (SMALL HACKY way to get around an issue)
    this.passwordChangedAt = Date.now() - 1000;
    next();

});

userSchema.pre(/^find/, function (next) {
    //This is query middleware, so this points to the current query.
    this.find({
        active: {
            $ne: false
        }
    });
    next();
});

//instance method, available on all docuemnts in a certain collections
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

        return JWTTimestamp < changedTimeStamp;
    }

    // FALSE mean the password has not chagned - so it's less than the changed timestamp
    return false;
};

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log({
            resetToken
        },
        this.passwordResetToken
    );

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}



const User = mongoose.model('User', userSchema);

module.exports = User;