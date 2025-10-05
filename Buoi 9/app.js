var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rectangleRoutes = require('./routes/rectangle.route');
var squareRoutes = require('./routes/square.route');
const productRoutes = require('./routes/product.route');  
const { log } = require('console');

var app = express();

// ======= KẾT NỐI MONGODB =======
// const { connectDB } = require('./database/mongoDB');
// connectDB();
// ================================

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', squareRoutes);
app.use('/users', usersRouter);
app.use('/rectangle', rectangleRoutes);
app.use('/square', squareRoutes);
app.use('/api', productRoutes);  


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
