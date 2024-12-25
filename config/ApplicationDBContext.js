import mongoose from 'mongoose';

export const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://Avinash:bHMdG1VZAehKwu7j@temp-pro.qnun8.mongodb.net/?retryWrites=true&w=majority&appName=Temp-pro', {
    });
    console.log("DB is connected successfully.");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);  // Exit the process if DB connection fails
  }
};