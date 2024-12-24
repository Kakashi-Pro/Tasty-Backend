

import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes leading and trailing spaces
      maxlength: 100, // Maximum length of food name
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500, // Maximum length for the description
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Price cannot be negative
    },
    type: {
      type: String,
      enum: ['appetizer', 'main course', 'dessert', 'beverage'], // Food types can be one of these
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant', // Reference to the Restaurant model
      required: true,
    },
    image: {
      type: String,
      required: false, // If you want to store a URL to an image of the food
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Food model
const Food = mongoose.model('Food', foodSchema);

export default Food;
