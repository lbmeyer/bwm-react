const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: [128, 'Too many characters, max is 128 characters']
  },
  city: { type: String, required: true, lowercase: true },
  street: {
    type: String,
    required: true,
    minlength: [4, 'Too short, min is 4 characters']
  },
  category: { type: String, required: true, lowercase: true },
  image: { type: String, required: true },
  bedrooms: Number,
  shared: Boolean,
  description: { type: String, require: true },
  dailyRate: Number,
  createdAt: { type: Date, default: Date.now },
  user: {type: Schema.Types.ObjectId, ref: 'User'} // each rental has only 1 user
});

module.exports = mongoose.model('Rental', rentalSchema);
