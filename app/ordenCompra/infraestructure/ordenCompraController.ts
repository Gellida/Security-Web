import { MySqlClienteRepository } from "../../cliente/infrastructure/mySqlClienteRepository";
import { SucursalClienteMySqlRepository } from "../../cliente_sucursal/infraestructure/cliente_sucursalMySqlRepository";
import { Controller } from "../../infraestructureProvider/controllerProvider";
import { MySqlServicioRepository } from "../../servicio/infrastructure/mySqlServicioRepository";
import { OrdenCompraRegister } from "../aplication/ordenCompraRegister";
import { OrdenCompraMySqlRepository } from "./ordenCompraMySqlRepository";


export class OrdenCompraCreateController {
    static registrarNuevaOrdenCompra(req, res){
        let ordenCompraRepository = new OrdenCompraMySqlRepository();
        let clienteRepository = new MySqlClienteRepository()
        let sucursalRepository = new SucursalClienteMySqlRepository();
        let servicioRepository = new MySqlServicioRepository()
        let registarOrdenCompra = new OrdenCompraRegister(ordenCompraRepository,sucursalRepository,clienteRepository,servicioRepository);
        Controller.execute(registarOrdenCompra, req.body, res);
    }
    static actualizarCoizacion(req, res) {
        
    }
}