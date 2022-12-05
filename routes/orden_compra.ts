import { MySqlClienteRepository } from "../app/cliente/infrastructure/mySqlClienteRepository";
import { SucursalClienteMySqlRepository } from "../app/cliente_sucursal/infraestructure/cliente_sucursalMySqlRepository";
import { CotizacionToOrdenCompraMySqlRepository } from "../app/cotizacion/infraestructure/cotizacionMySqlRepository";
import { OrdenCompraCreateController } from "../app/ordenCompra/infraestructure/ordenCompraController";
import { OrdenCompraMySqlRepository } from "../app/ordenCompra/infraestructure/ordenCompraMySqlRepository";

var express = require("express");
var router = express.Router();

router.get("/", (req, res) => res.render("orden_compra", { title: "Express" }));
router.get("/pendientes", async (req, res) => {
    const cotizacionesAceptada = await (new CotizacionToOrdenCompraMySqlRepository).getAceptedCotizacion();
    res.render("orden_compra_pendientes", {ordenes: cotizacionesAceptada});
});
router.get("/:id/editar", async (req, res) => {
    let orden_compra = await(new OrdenCompraMySqlRepository()).find(req.params.id)
    let cliente = await (new MySqlClienteRepository()).find(orden_compra.clienteId)
    let sucursal = await (new SucursalClienteMySqlRepository()).find(orden_compra.sucursalId);
    console.log(orden_compra.serviciosIds);
    res.render("orden_compra_editar", {orden_compra: orden_compra, cliente: cliente, sucursal: sucursal});
})

router.post("/", (req, res) => OrdenCompraCreateController.registrarNuevaOrdenCompra(req, res));
router.get("/all",async (req, res)=>{
    res.send( await(new OrdenCompraMySqlRepository()).all())
})
router.post("/:id/aceptar", (req, res) => {});
router.put("/:id/editar", (req, res) => {
    
});

router.get("/verificar_ubicacion", async (req, res) => {
    res.render("verificar_ubicacion", );
});

router.get("/asignar_elementos", async (req, res) => {
    res.render("asignar_elementos", );
});
router.get("/asignar_equipos", async (req, res) => {
    res.render("asignar_equipos", );
});
router.get("/verificar_precios", async (req, res) => {
    res.render("verificar_precios", );
});
router.get("/generar_contrato", async (req, res) => {
    res.render("contrato", );
});
router.get("/generar_orden_pago", async (req, res) => {
    res.render("generar_orden_pago", );
});
router.get("/avisos", async (req, res) => {
    res.render("avisos", );
});
module.exports = router;