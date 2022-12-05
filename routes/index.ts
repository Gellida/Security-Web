var express = require("express");
var router = express.Router();
var empleadoController = require("../app/empleado/infrastructure/empleadoController");
var sessionManagment = require("../app/infraestructureProvider/sessionManagment");

router.get("/", (req, res) => res.render("login"));
router.post("/login", (req, res) => empleadoController.login(req, res));
router.get("/logout", (req, res) => sessionManagment.deleteSession(req, res));
router.post("/new_password", (req, res) => {})

module.exports = router;
