const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
    return res.status(500).json({
        status: 'Error',
        message: 'Route Does not yet exist'
    });
};

const getUser = (req, res) => {
    return res.status(500).json({
        status: 'Error'
    });
};

const createUser = (req, res) => {
    return res.status(500).json({
        status: 'Error'
    });
};

const updateUser = (req, res) => {
    return res.status(500).json({
        status: 'Error'
    });
};

const deleteUser = (req, res) => {
    return res.status(500).json({
        status: 'Error'
    });
};

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;