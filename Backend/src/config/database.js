const mongoose = require("mongoose");
require('dotenv').config();


const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;  // Ensure the MongoDB URI is properly set
    if (!dbUri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }
    await mongoose.connect(dbUri);  // No need to pass deprecated options
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
