const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookstore");

    console.log("✅ MongoDB connected to bookstore database");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = databaseConnection;
