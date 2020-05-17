//core modules go first
const fs = require('fs');

//node imprted modules
const express = require('express');
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
    console.log("Hello from the Middleware");
    next();
});

app.use((req, res, next) => {
    console.log("Hello from Middleware Stage 2");
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(
        `${__dirname}/dev-data/data/tours-simple.json`
    )
);

//Route Handlers

const getAllTours = (req, res) => {
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

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
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

const deleteTour = (req, res) => {
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

//Get a list of all the tours
//app.get('/api/v1/tours', getAllTours);

//GET a single tour.
//app.get('/api/v1/tours/:id', getTour);

//Create a new tour
//app.post('/api/v1/tours', createTour);

//PATCH - only requires the data that needs to be uploaded
//app.patch('/api/v1/tours/:id', updateTour);

//DELETE TOUR
//app.delete('/api/v1/tours/:id', deleteTour);

//Routes



const tourRouter = express.Router();
const userRouter = express.Router();


tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Server Start Details
const port = 3000;
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});