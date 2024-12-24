import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/', {
    });
    console.log("DB is connected successfully.");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);  // Exit the process if DB connection fails
  }
};