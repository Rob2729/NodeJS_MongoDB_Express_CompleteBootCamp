const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({
    path: './../../config.env',
});

mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log("DB Connection Successful"));

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf8'));

//import data into database
const importData = async () => {
    try {
        await Tour.create(tours);
        console.log('Data successfully loadded');

    } catch (err) {
        console.log(err);
    }
    process.exit();
};

//Delete all data from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        console.log('Data deleted successfully');

    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}