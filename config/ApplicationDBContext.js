import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/test'
    );
    console.log("DB is connected successfully.");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);  // Exit the process if DB connection fails
  }
};