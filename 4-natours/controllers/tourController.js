const Tour = require('../models/tourModel');


// const tours = JSON.parse(
//     fs.readFileSync(
//         `${__dirname}/../dev-data/data/tours-simple.json`
//     )
// );

//MONGOOSE MODEL WILL NOW HANDLE THIS
// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         });
//     }
//     next();
// };

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'Success',
        requestedAt: req.requestTime,
        // results: tours.length,
        // data: {
        //     tours,
        // },
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    //const id = req.params.id * 1;
    // //const tour = tours.find((el) => el.id === id);

    // res.status(200).json({
    //     status: 'Success',
    //     data: {
    //         tour,
    //     },
    // });
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(
            req.body
        );

        res.status(201).json({
            message: 'Success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data Sent'
        });
    }
};

exports.updateTour = (req, res) => {
    Tour.create({

    });
    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated Tour Here>',
        },
    });
};

exports.deleteTour = (req, res) => {
    res.status(204).json({
        status: 'Success',
        data: null,
    });
};