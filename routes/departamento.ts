const { MySqlEmpleadoRepository } = require("../app/empleado/infrastructure/mySqlEmpleadoRepository");
var express = require("express");
var router = express.Router();
var controller = require("../app/departamento/infraestructure/departamentoController");



/* Vistas */
router.get("/registrar", async (req, res, next) => res.render("departamento_register", { title: "Express" }));
    
router.get("/listar", async (req, res) => {
    const empleados = await (new MySqlEmpleadoRepository()).getAllActivesEmpleados();
    res.render("empleados_filter", { Auth : sessionManagment.getUser(req), Empleados : empleados });
});

/* Recursos */

router.post("/", (req, res) => controller.registerDepartamento(req, res));

router.get("/all", async (req, res) => await controller.getAll(req, res))

module.exports = router;