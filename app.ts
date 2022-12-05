
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
require("dotenv").config();

var indexRouter = require('./routes/index');
var empleadoRouter = require('./routes/empleado');
var clienteRouter = require('./routes/cliente');
var dashRouter = require('./routes/dashboard');
var orden_compra = require('./routes/orden_compra');
var contratoRouter = require('./routes/contrato');
var servicioRouter = require('./routes/servicio');
var departamentoRouter = require('./routes/departamento');
var cotizacionRouter = require('./routes/cotizacion');
var sessionProvider = require("./app/infraestructureProvider/sessionManagment");
var empresaRouter = require('./routes/empresa');
var gastoRouter = require('./routes/gasto')

var app = express();

import { Publisher } from "./app/domainProvider/DomainEvent"
import { EmpleadoVitacora1, EmpleadoVitacora2 } from "./app/empleado/infrastructure/empleadoVitacora";

Publisher.get().registerNewSusbcriber(new EmpleadoVitacora1())
Publisher.get().registerNewSusbcriber(new EmpleadoVitacora2())
// session setup
app.use(session({
  secret: process.env.SESSION_COOKIE_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// utentification setup
app.use(function(req, res, nex){
  if(process.env.DEV_MODE === "ACTIVE") nex();
  else sessionProvider.autentication(req, res, nex);
});

// ruter setup
app.use('/', indexRouter);
app.use('/empleado', empleadoRouter);
app.use('/cliente', clienteRouter);
app.use('/dashboard', dashRouter);
app.use('/cotizacion', cotizacionRouter);
app.use('/orden_compra', orden_compra);
app.use('/contrato', contratoRouter);
app.use('/departamento', departamentoRouter);
app.use('/servicio', servicioRouter);
app.use('/empresa',empresaRouter);
app.use('/gasto',gastoRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
