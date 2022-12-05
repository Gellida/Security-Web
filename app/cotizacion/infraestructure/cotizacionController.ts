import { MySqlClienteRepository } from "../../cliente/infrastructure/mySqlClienteRepository";
import { SucursalClienteMySqlRepository } from "../../cliente_sucursal/infraestructure/cliente_sucursalMySqlRepository";
import { Controller } from "../../infraestructureProvider/controllerProvider";
import { MySqlServicioRepository } from "../../servicio/infrastructure/mySqlServicioRepository";
import { CotizacionAceptar } from "../aplication/cotizacionAceptada";
import { CotizacionRegister } from "../aplication/cotizacionRegister";
import { CotizacionSend } from "../aplication/cotizacionSend";
import { CotizacionUpdate } from "../aplication/cotizacionUpdate";
import { CotizacionPDF } from "./cotizacionFiles";
import { CotizacionMySqlRepository, CotizacionToOrdenCompraMySqlRepository } from "./cotizacionMySqlRepository";


export class CotizacionCreateController {
    static registrarNuevaCotizacion(req, res){
        let cotizacionRepository = new CotizacionMySqlRepository();
        let clienteRepository = new MySqlClienteRepository()
        let sucursalRepository = new SucursalClienteMySqlRepository();
        let servicioRepository = new MySqlServicioRepository()
        let registarCotizacion = new CotizacionRegister(cotizacionRepository,sucursalRepository,clienteRepository,servicioRepository);
        Controller.execute(registarCotizacion, req.body, res);
    }

    static actualizarCoizacion(req, res) {
        let repository = new CotizacionMySqlRepository();
        let cotizacionActualizar = new CotizacionUpdate(repository);
        Controller.execute(cotizacionActualizar, req.body, res);
    }

    static aceptarCotizacion(req, res) {
        const aceptedCotizacion = new CotizacionAceptar(new CotizacionToOrdenCompraMySqlRepository())
        Controller.execute(aceptedCotizacion, req.params.id, res);
    }

    static sendPDF(req, res) {
        let cotizacionRepository = new CotizacionMySqlRepository();
        let clienteRepository = new MySqlClienteRepository()
        let sucursalRepository = new SucursalClienteMySqlRepository();
        let pdf = new CotizacionPDF();
        let send = new CotizacionSend(cotizacionRepository,clienteRepository,sucursalRepository,pdf);
        Controller.execute(send, req.params.id, res, (pdf)=> pdf.send(res));
    }
}