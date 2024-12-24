import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  restaurantname: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: false, // If you want to store a URL to an image of the food
  },
  mobileno: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v);  // simple validation for 10-digit mobile number
      },
      message: props => `${props.value} is not a valid mobile number!`
    }
  }
  
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt timestamps
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;
