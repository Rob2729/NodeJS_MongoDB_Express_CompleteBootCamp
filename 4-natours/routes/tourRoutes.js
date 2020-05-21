const express = require('express');
const tourController = require('./../controllers/tourController');



const router = express.Router();

//Parameter middleware 
//we get access to 4 variables for param middleware
// req,res next, val (parameter value)
//router.param('id', tourController.checkID);

//in the post example below we have chained middleware functions to the post, so we will always doa checkBody 
//to validate the request.
router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);


module.exports = router;