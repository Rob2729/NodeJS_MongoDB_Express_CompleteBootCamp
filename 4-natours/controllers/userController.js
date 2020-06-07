const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};


exports.getAllUsers = factory.getAll(User);
// exports.getAllUsers = catchAsync(async (req, res, next) => {
//     const users = await User.find();

//     //SEND RESPONSE
//     res.status(200).json({
//         status: 'Success',
//         requestedAt: req.requestTime,
//         results: users.length,
//         data: {
//             users,
//         },
//     });
// });

exports.updateMe = async (req, res, next) => {
    // 1) create an error if user tried to update password.
    if (req.body.password || req.body.passwordConfirm) {
        return next(new AppError('This route is not for updating passwords', 400));
    }

    //filtered out unwanted fields that we don't want to be updated.
    // e.g we don't want to give anyone access to giving themselves admin rights.
    const filteredBody = filterObj(req.body, 'name', 'email');


    // 3) if not, then update the user document.
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
        new: true,
        runValidators: true
    });


    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, {
        active: false
    });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// exports.getUser = (req, res) => {
//     return res.status(500).json({
//         status: 'Error',
//         message: 'Route Does not yet exist'
//     });
// };

exports.getUser = factory.getOne(User);

exports.createUser = (req, res) => {
    return res.status(500).json({
        status: 'Error',
        message: 'Route Dwill never be defined! please use sign up'
    });
};

// exports.updateUser = (req, res) => {
//     return res.status(500).json({
//         status: 'Error',
//         message: 'Route Does not yet exist'
//     });
// };

exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

// exports.deleteUser = (req, res) => {
//     return res.status(500).json({
//         status: 'Error',
//         message: 'Route Does not yet exist'
//     });
// };