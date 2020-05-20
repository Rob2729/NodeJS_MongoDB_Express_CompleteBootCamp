const express = require('express');
const tourController = require('./../controllers/tourController');



const router = express.Router();

//Parameter middleware 
//we get access to 4 variables for param middleware
// req,res next, val (parameter value)
router.param('id', tourController.checkID);

router.route('/').get(tourController.getAllTours).post(tourController.createTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);


module.exports = router;