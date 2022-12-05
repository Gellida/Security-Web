
var express = require("express");
var router = express.Router();
var controller = require("../app/gasto/infraestructure/gastoController");

/* Vistas */
router.get("/registrar", async (req, res, next) => {
    res.render("gasto");
});
    

/* Recursos */

router.post("/", (req, res) => controller.registerGasto(req, res));

router.get("/all", async (req, res) => await controller.getAll(req, res))

module.exports = router;