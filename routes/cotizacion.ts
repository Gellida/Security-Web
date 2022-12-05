import { MySqlClienteRepository } from "../app/cliente/infrastructure/mySqlClienteRepository";
import { SucursalClienteMySqlRepository } from "../app/cliente_sucursal/infraestructure/cliente_sucursalMySqlRepository";
import { CotizacionCreateController } from "../app/cotizacion/infraestructure/cotizacionController";
import { CotizacionMySqlRepository } from "../app/cotizacion/infraestructure/cotizacionMySqlRepository";
import { PDF } from "../app/infraestructureProvider/fileProvider";

var express = require("express");
var router = express.Router();

router.get("/", (req, res) => res.render("cotizacion", { title: "Express" }));
router.get("/pendientes", async (req, res) => {
    const Cotizaciones = await(new CotizacionMySqlRepository()).all();
    for(const cotizacion of Cotizaciones) {
        cotizacion.cliente = await (new MySqlClienteRepository()).find(cotizacion.clienteId);
        cotizacion.sucursal = await (new SucursalClienteMySqlRepository()).find(cotizacion.sucursalId);
    }
    res.render("cotizacion_pendientes", {cotizaciones: Cotizaciones});
});
router.get("/:id/editar", async (req, res) => {
    let cotizacion = await(new CotizacionMySqlRepository()).find(req.params.id)
    let cliente = await (new MySqlClienteRepository()).find(cotizacion.clienteId)
    let sucursal = await (new SucursalClienteMySqlRepository()).find(cotizacion.sucursalId);
    console.log(cotizacion.serviciosIds);
    res.render("cotizacion_editar", {cotizacion: cotizacion, cliente: cliente, sucursal: sucursal});
})

router.post("/", (req, res) => CotizacionCreateController.registrarNuevaCotizacion(req, res));
router.get("/all",async (req, res)=>{
    res.send( await(new CotizacionMySqlRepository()).all())
})
router.post("/:id/aceptar", (req, res) => {
    
});
router.put("/:id", (req, res) => CotizacionCreateController.actualizarCoizacion(req, res));
router.delete('/:id', async (req, res) => {
    await (new CotizacionMySqlRepository()).delete(req.params.id);
    res.json({data: "ok"})
});
router.get('/:id/pdfRender', (req, res) => CotizacionCreateController.sendPDF(req, res));

module.exports = router;
