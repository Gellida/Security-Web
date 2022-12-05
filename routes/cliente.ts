import { ClienteViewController } from "../app/cliente/infrastructure/clienteViewController";
import { MySqlClienteRepository } from "../app/cliente/infrastructure/mySqlClienteRepository";
let SucursalClienteController = require("../app/cliente_sucursal/infraestructure/cliente_sucursalController");
let ClienteController = require("../app/cliente/infrastructure/clienteController");
const SessionManagment = require('../app/infraestructureProvider/sessionManagment');


var express = require("express");
var router = express.Router();

/* Vistas */
router.get("/registrar", (req, res) => ClienteViewController.registrarClienteView(req, res));

router.get("/actualizar/:id", (req, res) => ClienteViewController.actualizarCliente(req, res));

router.get("/listar", (req, res) => ClienteViewController.listadoClienteView(req, res));

router.get("/adeudo", (req, res, next) => res.render("clientes_adeudo", { Auth : SessionManagment.getUser(req)}));


/* Recursos */
router.get("/{id}/sucursales", (req, res) => SucursalClienteController.getSucursalByCliente(req, res));

router.post("/", (req, res) => ClienteController.registrar(req, res));

router.get('/get/:id', (req, res) => ClienteController.getCliente(req, res));

router.get("/all", (req,res) => ClienteController.getAll(req, res));

router.post("/sucursal", (req, res) =>{  SucursalClienteController.createNewSucursal(req, res)});

router.get("/:id/sucursales", (req, res) => SucursalClienteController.getSucursalByCliente(req, res));

router.delete('/', (req, res) => ClienteController.delete(req, res));

router.put("/", (req, res,) => ClienteController.update(req, res));

module.exports = router;
