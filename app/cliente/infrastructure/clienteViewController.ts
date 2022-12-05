const SessionManagment = require("../../infraestructureProvider/sessionManagment");
import { MySqlClienteRepository } from "./mySqlClienteRepository";

export class ClienteViewController {
    static repository = new MySqlClienteRepository();

    public static registrarClienteView(req, res) {
        res.render("cliente", { Auth :  SessionManagment.getUser(req)});
    }

    public static actualizarCliente(req, res) {
        const clienteId = req.params.id
        res.render("cliente_update", { Auth : SessionManagment.getUser(req), clienteId: clienteId })
    }

    public static async listadoClienteView(req, res) {
        const clientes = await this.repository.getAllActivesClientes();
        res.render("clientes_filter", { Auth :  SessionManagment.getUser(req), clientes : clientes });
    }
}