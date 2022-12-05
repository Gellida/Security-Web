import { Controller } from "../../infraestructureProvider/controllerProvider";
import { ClienteEliminar } from "../aplication/clienteEliminar";
import { ClienteRegister } from "../aplication/clienteRegister";
import { ClienteFactory } from "../domain/clienteFactory";
import { MySqlClienteRepository } from "./mySqlClienteRepository";

export class ClienteController {
  static repository = new MySqlClienteRepository()
  static execute = Controller.execute;
  

  public static async registrar(req, res): Promise<void> {
    let registrarCliente = new ClienteRegister(this.repository);
    this.execute(registrarCliente, req.body, res);
  }

  public static async modificar(req, res): Promise<void> {
    let registrarCliente = new ClienteRegister(this.repository);
    this.execute(registrarCliente, req.body, res);
  }

  public static async getAll(req, res) {
    try {
      const clientes = await this.repository.getAllActivesClientes();
      res.json(clientes);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
  

  public static async delete(req, res) {
    const EliminarCliente = new ClienteEliminar(this.repository);
    this.execute(EliminarCliente, req.body.empleadoId, res);
  }

  public static async getCliente(req, res) {
    const cliente = await this.repository.find(req.params.id);
    console.log(cliente);
    
    res.json({data : cliente});
  }
  public static async update(req, res) {
    const cliente = ClienteFactory.makeCliente(req.body);
    console.log(cliente);
    
    await this.repository.update(cliente);
    res.json({ data: "ok" })
  }
}

module.exports = ClienteController;