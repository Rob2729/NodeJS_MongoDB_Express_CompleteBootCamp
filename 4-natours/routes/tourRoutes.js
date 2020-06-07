const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

//Parameter middleware
//we get access to 4 variables for param middleware
// req,res next, val (parameter value)
//router.param('id', tourController.checkID);

// * we have nested this route so that it will create a review while using the tested route.
// * /api/v1/tour/:tourID/reviews  - will create a review for a specific tour
router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(authController.protect, authController.restrictTo('admin', 'lead-guide', 'guides'), tourController.getMonthlyPlan);

//in the post example below we have chained middleware functions to the post, so we will always doa checkBody
//to validate the request.
router.route('/').get(tourController.getAllTours).post(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.updateTour)
  .delete(authController.protect, authController.restrictTo('admin', 'lead-guide'), tourController.deleteTour);


module.exports = router;