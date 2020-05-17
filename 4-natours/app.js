//core modules go first
const fs = require('fs');

//node imprted modules
const express = require('express');
const app = express();

app.use(express.json());
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello from the server side',
//         app: 'Natours'
//     });
// });

// app.post('/', (req, res) => {
//     res.status(200).send('You can post to this endpoint');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//Get a list of all the tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

//GET a single tour.
app.get('/api/v1/tours/:id', (req, res) => {
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
});

//Create a new tour
app.post('/api/v1/tours', (req, res) => {
  console.log('Start of creating a tour');

  const newID = tours[tours.length - 1].id + 1;
  const newTours = Object.assign(
    {
      id: newID,
    },
    req.body
  );

  tours.push(newTours);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) console.log(`Something went wrong when writing to file`);
      res.status(201).json({
        message: 'Success',
        data: {
          tour: newTours,
        },
      });
    }
  );
});

//PATCH - only requires the data that needs to be uploaded
app.patch('/api/v1/tours/:id', (req, res) => {
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
});

//DELETE TOUR
app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
