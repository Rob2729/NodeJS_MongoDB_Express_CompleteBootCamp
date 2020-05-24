//core modules go first

//node imprted modules
const express = require('express');
const morgan = require('morgan');

//point to the routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//Middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//express can also serve static files.
//we point to the folder and can display the files inside the folder
app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//WE CAN ADD MIDDLEWARE AFTER THE ROUTERS TO CATCH ANY ROUTE EXCEPTIONS
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  })
});

module.exports = app;