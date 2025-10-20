var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressLayouts = require('express-ejs-layouts');

// 🔹 Import route
var squareRoutes = require('./routes/square.route');

// 🔹 Import kết nối Sequelize
const sequelize = require('./database/mysql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', squareRoutes);
app.use('/square', squareRoutes);

// ✅ Kết nối & đồng bộ Sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully via Sequelize');
    await sequelize.sync(); // Tự tạo bảng nếu chưa có
    console.log('✅ Database synced');
  } catch (err) {
    console.error('❌ Database connection error:', err.message);
  }
})();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
