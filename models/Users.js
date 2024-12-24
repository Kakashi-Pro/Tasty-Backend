import mongoose from "mongoose";
// Create a Schema for the User model
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,  // Make name required
        trim: true,      // Remove extra spaces
    },
    email: {
        type: String,
        required: true,  // Make email required
        unique: true,    // Ensure unique email addresses
        lowercase: true, // Convert to lowercase
        trim: true,      // Remove extra spaces
    },
    password: {
        type: String,
        required: true,  // Make password required
        minlength: 6,    // Ensure minimum length of password
    },

    mobileNo: {
        type: String,
        required: false, // Mobile number is optional
        match: [/^\d{10}$/, 'Please fill a valid 10-digit mobile number'] // Mobile number format validation (adjust if needed)
      },
    createdAt: {
        type: Date,
        default: Date.now, // Set default value to the current date/time
    },
});

const User = mongoose.model('User', userSchema);

export default User

