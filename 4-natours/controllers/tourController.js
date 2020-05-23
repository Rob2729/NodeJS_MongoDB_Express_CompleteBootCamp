/* eslint-disable node/no-unsupported-features/es-syntax */
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

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingAverage,price';
    req.query.fields = 'name,price,ratingAverage,summary,difficulty';
    next();
};

exports.getAllTours = async (req, res) => {
    try {
        //BUILD THE QUERY
        //1A. Filtering
        const queryObject = {
            ...req.query
        };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(el => delete queryObject[el]);
        console.log(req.query);


        //1B. Advanced Filtering
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(JSON.parse(queryString));

        let query = Tour.find(JSON.parse(queryString));

        //2. Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        //3. FIELD LIMITING THE FIELDS BEING RETURNED
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        //4. PAGINATION
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        if (req.query.page) {
            const numberOfTours = await Tour.countDocuments();
            if (skip >= numberOfTours) throw new Error('This page does not exist');
        }


        //EXECUTE THE QUERY
        const tours = await query;


        //SEND RESPONSE
        res.status(200).json({
            status: 'Success',
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);

        res.status(200).json({
            status: 'Success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            message: 'Success',
            data: {
                tour: newTour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'Invalid Data Sent',
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(
            req.params.id,
            req.body, {
                new: true,
                runValidators: true,
            }
        );

        Tour.create({});
        res.status(200).json({
            status: 'Success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'Success',
            data: null,
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
};