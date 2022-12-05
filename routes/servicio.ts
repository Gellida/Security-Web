var express = require("express");
var router = express.Router();
var controller = require("../app/servicio/infrastructure/servicioController");

router.get("/registrar", (req, res, next) => res.render("servicio", { title: "Express" }));
router.post("/", (req, res) => controller.registrar(req, res));
router.get("/all", (req, res)=> controller.getAll(req,res));
router.get("/", (req, res) => res.render("servicio", { title: "Express" }));
router.get("/pdfRender", (req, res) => controller.sendCatalogoInPDF(req, res));

//router.post("/", (req, res) => controller.registrar(req,res));

module.exports = router;