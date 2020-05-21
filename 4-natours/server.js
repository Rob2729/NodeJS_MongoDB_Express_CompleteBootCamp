const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({
  path: './config.env',
});

mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log("DB Connection Successful"));

const app = require('./app');

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});