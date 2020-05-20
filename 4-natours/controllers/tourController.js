const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
    )
);

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is : ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
};

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'Success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours,
        },
    });
};

exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
        status: 'Success',
        data: {
            tour,
        },
    });
};

exports.createTour = (req, res) => {
    console.log('Start of creating a tour');

    const newID = tours[tours.length - 1].id + 1;
    const newTours = Object.assign({
            id: newID,
        },
        req.body
    );

    tours.push(newTours);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            if (err)
                console.log(
                    `Something went wrong when writing to file`
                );
            res.status(201).json({
                message: 'Success',
                data: {
                    tour: newTours,
                },
            });
        }
    );
};

exports.updateTour = (req, res) => {
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