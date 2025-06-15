import mongoose from "mongoose";

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
    console.log('Database Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Optional: exit the process on failure
  }
};

export default connectDB;
