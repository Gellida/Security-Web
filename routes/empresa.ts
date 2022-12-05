
import { EmpresaViewController } from "../app/empresa/infraestructure/empresaViewController";
import { MySqlEmpresaRepository } from "../app/empresa/infraestructure/mySqlEmpresaRepository";

var express = require("express");
var router = express.Router();
var controller = require("../app/empresa/infraestructure/empresaController");



/* Vistas */
router.get("/registrar", (req, res, next) => res.render("empresa_register", ));

router.get("/actualizar/:id", (req, res) => EmpresaViewController.actualizarEmpresa(req, res));
    

/* Recursos */ 
router.get('/get', (req, res) => controller.getEmpresa(req, res));

router.get("/all", async (req, res) => await controller.getAll(req, res))

router.put("/", (req, res,) =>  controller.update(req, res));

module.exports = router;