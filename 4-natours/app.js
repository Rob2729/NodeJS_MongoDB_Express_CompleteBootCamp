//core modules go first

//node imprted modules
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

//require the appError class
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

//point to the routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

//GLOBAL Middlewares

//Set security HTTP headers
app.use(helmet());

//Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit Requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour! ',
});

app.use('/api', limiter);

//Body Parser, reading data from the body into req.body
app.use(
  express.json({
    limit: '10kb',
  })
);

// Data Santization against NoSQL Query injection
//will need to use in all apps to avoid attacks
app.use(mongoSanitize());

// Data Santization against XSS Attacks
// will clean malicious html and javascript code.
app.use(xss());

// Prevents Parameter Pollution
// This is when we receive multiple of the same paramter, the code will make this into an array and then fail.
// We can add whitelist parameters to make sure we can have multiple queries on some parameters
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Serving Static Files
//express can also serve static files.
//we point to the folder and can display the files inside the folder
app.use(express.static(`${__dirname}/public`));

//Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.headers);
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
app.use('/api/v1/reviews', reviewRouter);

//WE CAN ADD MIDDLEWARE AFTER THE ROUTERS TO CATCH ANY ROUTE EXCEPTIONS
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server`
  // })

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;
  // next(err);

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;