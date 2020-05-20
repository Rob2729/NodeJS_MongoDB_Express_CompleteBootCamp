const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/../dev-data/data/tours-simple.json`
    )
);

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

    //two solutions to check if tour exists, by checking checking the length that we have, or by looking for the tour object
    //if (id > tours.length)
    if (!tour) {
        return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID supplied',
        });
    }

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
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'Success',
        data: {
            tour: '<Updated Tour Here>',
        },
    });
};

exports.deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(204).json({
        status: 'Success',
        data: null,
    });
};