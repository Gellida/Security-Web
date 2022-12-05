let EmpleadoController = require("../app/empleado/infrastructure/empleadoController");
import { EmpleadoViewController } from "../app/empleado/infrastructure/empleadoViewController";
var express = require("express");
var router = express.Router({ mergeParams: true });

/* Vistas. */
router.get("/", (req, res) => res.redirect('/empleado/registrar'));

router.get("/registrar", (req, res) => EmpleadoViewController.registrarEmpleadoView(req, res));

router.get("/actualizar/:id", (req, res) => EmpleadoViewController.actualizarEmpleado(req, res));

router.get("/listar", (req, res) => EmpleadoViewController.listadoEmpleadoView(req, res));


/* Recursos */
router.post("/", (req, res) => EmpleadoController.registrar(req, res));

router.get("/all", (req, res) => EmpleadoController.getAll(req, res));

router.get('/get/:id', (req, res) => EmpleadoController.getEmpleado(req, res));

    router.delete('/', (req, res) => EmpleadoController.delete(req, res));

router.put("/", (req, res,) => EmpleadoController.update(req, res));

module.exports = router;
