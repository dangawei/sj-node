var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require("cors");

var index = require('./routes/index');
var users = require('./routes/users');
var mysql = require('./routes/mysql');
var user = require('./routes/user');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/', index);
app.use('/users', users);
app.use('/login', mysql);
app.use('/user', user);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//设置跨域访问

//app.all("*",function (req, res, next) {
//  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//  res.header("Access-Control-Allow-Credentials", "true");
//  res.header("Access-Control-Allow-Origin", "*");
//  if (req.method == 'OPTIONS') {
//      /*让options请求快速返回*/ 
//      res.send(200);
//  }
//  else {
//      next();
//  }
//});
//设置跨域访问
//app.all('*', function(req, res, next) {
//	res.header("Access-Control-Allow-Origin", "*");
//	res.header("Access-Control-Allow-Headers", "X-Requested-With");
//	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//	res.header("X-Powered-By",' 3.2.1');
//	res.header("Content-Type", "application/json;charset=utf-8");
//	next();
//});
module.exports = app;