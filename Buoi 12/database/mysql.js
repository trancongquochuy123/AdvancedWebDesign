require('dotenv').config(); // đặt ở đầu file
const { Sequelize } = require('sequelize');

// Khởi tạo kết nối Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,      // database
  process.env.DB_USER,      // username
  process.env.DB_PASSWORD,  // password
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Ẩn log SQL (bật nếu muốn debug)
  }
);

// Kiểm tra kết nối
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected successfully via Sequelize');
  } catch (err) {
    console.error('❌ MySQL connection error:', err.message);
  }
})();

module.exports = sequelize;
