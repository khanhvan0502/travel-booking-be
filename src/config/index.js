// src/config/index.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ [MongoDB] Connected successfully");
  } catch (error) {
    console.error("❌ [MongoDB] Connection failed:", error.message);
    process.exit(1); // Dừng app nếu không kết nối được DB
  }
};

module.exports = connectDB;
