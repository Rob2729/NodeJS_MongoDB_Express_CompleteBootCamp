const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();

    //SEND RESPONSE
    res.status(200).json({
        status: 'Success',
        requestedAt: req.requestTime,
        results: users.length,
        data: {
            users,
        },
    });
});

exports.getUser = (req, res) => {
    return res.status(500).json({
        status: 'Error',
        message: 'Route Does not yet exist'
    });
};

exports.createUser = (req, res) => {
    return res.status(500).json({
        status: 'Error',
        message: 'Route Does not yet exist'
    });
};

exports.updateUser = (req, res) => {
    return res.status(500).json({
        status: 'Error',
        message: 'Route Does not yet exist'
    });
};

exports.deleteUser = (req, res) => {
    return res.status(500).json({
        status: 'Error',
        message: 'Route Does not yet exist'
    });
};