const mongoose = require('mongoose');
const slugify = require('slugify');
//const validator = require('validator');
// const User = require('./userModel');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
    maxLength: [40, 'A tour name must have less or equal than 40 characters'],
    minLength: [10, 'A tour name must have more or equal to 10 characters']
    //this demonstrates using an external library for valiation
    //validate: [validator.isAlpha, 'Name must only contain characters']
  },
  slug: String,
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    enum: {
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty can only be easy, medium or difficult'
    }
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'A rating must be above 1.0'],
    max: [5, 'A rating must be lower than 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: {
    type: Number,
    //custom validator will make sure the discount price is not higher than the original price
    validate: {
      validator: function (val) {
        //This will not work with the update, only when creating a new document.
        //you cannot access 'this' when updating document
        return val < this.price;
      },
      message: 'Discount price ({$VALUE}) cannot be higher than the original price'
    },
  },
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
  startLocation: {
    //GeoJSON is used to specify geo json data 
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [{
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    },
    coordinates: [Number],
    address: String,
    description: String,
    day: Number
  }],
  guides: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User' //* having this here means you don't need to import the model.
  }]
}, {
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

// tourSchema.index({
//   price: 1
// });
tourSchema.index({
  price: 1,
  ratingAverage: -1
});
tourSchema.index({
  slug: 1
});

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// * Virtual Populate 
// * with the virtual populate we need to point to the foreign field (reviews model, with the field that contains the id, and the localField)
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

//DOCUMENT MIDDLEWARE: runs before the .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true
  });
  next();
});

//
// * THIS CODE WILL SHOW THE EMBEDDING METHOD OF HANDLING DOCUMENTS.
//
// tourSchema.pre('save', async function (next) {
//   const guidesPromises = this.guides.map(async id =>
//     await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  // tourSchema.pre('find', function (next) {
  this.find({
    secretTour: {
      $ne: true
    }
  });
  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  //   console.log(docs);
  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: "-__v -passwordChangedAt"
  });
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: {
      secretTour: {
        $ne: true
      }
    }
  });
  console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;