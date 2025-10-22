const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Import database và model
const sequelize = require('./database/mysql');
const Product = require('./models/product.model');

// Import routes
const adminRoutes = require('./routes/admin.route');
const clientRoutes = require('./routes/client.route');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.redirect('/products');
});

app.use('/admin', adminRoutes);
app.use('/products', clientRoutes);
// Error handler
app.use((req, res, next) => {
  res.status(404).render('error', {
    message: 'Trang không tìm thấy',
    error: { status: 404 }
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

// Sync database và seed data
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');

    // Seed data nếu chưa có
    const count = await Product.count();
    if (count === 0) {
      const demoData = [];
      for (let i = 1; i <= 100; i++) {
        demoData.push({
          name: `Sản phẩm ${i}`,
          price: (Math.random() * 1000).toFixed(2),
          image: 'default.jpg',
          description: `Mô tả chi tiết cho sản phẩm ${i}`
        });
      }
      await Product.bulkCreate(demoData);
      console.log('✅ Đã seed 100 sản phẩm mẫu!');
    }
  } catch (error) {
    console.error('❌ Database sync error:', error);
  }
})();

module.exports = app;