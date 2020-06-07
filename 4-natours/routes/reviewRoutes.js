const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// * We have allowed the merge params to be yes, so we can then get access to the tourId from the tour route when creating a review.
const router = express.Router({
    mergeParams: true
});

router.route('/').get(reviewController.getAllReviews).post(authController.protect, authController.restrictTo('user'), reviewController.createReview);


module.exports = router;