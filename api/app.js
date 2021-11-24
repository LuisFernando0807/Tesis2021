var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer({dest:'./upload/'});

var indexRouter = require('./routes/index');
var usuarioRouter = require('./routes/usuario');
var carpetasCompartidasRouter = require('./routes/carpetas-compartidas');
var solicitudFileServerRouter = require('./routes/solicitud-file-server');
var catalogoRouter = require('./routes/catalogo');
var categoriaRouter = require('./routes/categoria');
var ticketRouter = require('./routes/ticket');
var ticketDetalleRouter = require('./routes/ticket-detalle');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// for parsing multipart/form-data
app.use(upload.any()); 
app.use(express.static('public'));

app.use('/', indexRouter);
app.use('/usuario', usuarioRouter);
app.use('/carpetas-compartidas', carpetasCompartidasRouter);
app.use('/solicitud-file-server', solicitudFileServerRouter);
app.use('/catalogo', catalogoRouter);
app.use('/categoria', categoriaRouter);
app.use('/ticket', ticketRouter);
app.use('/ticket-detalle', ticketDetalleRouter);

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
