var express = require('express');
const { MySqlEmpleadoRepository } = require('../app/empleado/infrastructure/mySqlEmpleadoRepository');
const { MySqlClienteRepository } = require('../app/cliente/infrastructure/mySqlClienteRepository');
const { CotizacionMySqlRepository  } = require('../app/cotizacion/infraestructure/cotizacionMySqlRepository');
const SessionManagment  = require('../app/infraestructureProvider/sessionManagment');
var router = express.Router();

router.get('/', async (req, res) => {
  const numOfEmpleados = await (new MySqlEmpleadoRepository()).getAllActivesEmpleados();
  const numOfClientes = await (new MySqlClienteRepository()).getAllActivesClientes();
  const numOfCotizacionesPendientes = await (new CotizacionMySqlRepository).all();
  res.render('dashboard', { Auth :  SessionManagment.getUser(req), numOfEmpleados: numOfEmpleados.length, numOfClientes : numOfClientes.length, numOfCotizacionesPendientes: numOfCotizacionesPendientes.length});
});

module.exports = router;
