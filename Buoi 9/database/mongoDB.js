const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // dừng server nếu kết nối lỗi
  }
}

module.exports = { connectDB };
