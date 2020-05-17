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

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  res.status(200).json({ message: 'Success' });
});

const port = 3000;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
