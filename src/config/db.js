// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/yourdbname', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ [MongoDB] Connected successfully');
  } catch (err) {
    console.error('❌ [MongoDB] Connection failed:', err.message);
    process.exit(1); // Dừng server nếu lỗi kết nối
  }
};

module.exports = connectDB;
