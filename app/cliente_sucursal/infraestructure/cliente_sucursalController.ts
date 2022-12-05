import { Controller } from "../../infraestructureProvider/controllerProvider";
import { SucursalClienteRegister } from "../aplication/cliente_sucursalRegister";
import { SucursalClienteMySqlRepository } from "./cliente_sucursalMySqlRepository";

export class SucursalClienteController {
    static repository = new SucursalClienteMySqlRepository();
    static execute = Controller.execute;

    static async createNewSucursal(req, res) {
        const register = new SucursalClienteRegister(this.repository);
        this.execute(register, req.body, res);
    }

    static async getSucursalByCliente (req, res) {
        const cliente = req.params.id;
        const sucursales = await this.repository.findAllFromeSucursal(cliente);
        res.json({ data : sucursales });
    }
}

module.exports = SucursalClienteController