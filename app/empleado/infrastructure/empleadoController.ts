import { Controller } from "../../infraestructureProvider/controllerProvider";
import { EncryptionProvider } from "../../infraestructureProvider/encryptionProvider";
import { EmpleadoDespido } from "../aplication/empleadoDespido";
var SessionManagment = require("../../infraestructureProvider/sessionManagment");
import { EmpleadoLogin } from "../aplication/empleadoLogin";
import { NewPassword } from "../aplication/empleadoNewPassword";
import { EmpleadoRegister } from "../aplication/empleadoRegister";
import { EmpleadoFactory } from "../domain/empleadoFactory";
import { MySqlEmpleadoRepository } from "./mySqlEmpleadoRepository";

class EmpleadoController {
  static repository = new MySqlEmpleadoRepository();
  static encription = new EncryptionProvider();
  static session = SessionManagment.registerSession
  static execute = Controller.execute;

  static async login(req, res): Promise<void> {
    let empladoLogin = new EmpleadoLogin(this.repository, this.encription);
    this.execute(empladoLogin, req.body, res, (data) => this.session(data, req, res));
  }

  static async newPassword(req, res) {
    let newPassword = new  NewPassword(this.repository);
    this.execute(newPassword, req.body, res);
  }

  public static async registrar(req, res): Promise<void> {
    let registrarEmpleado = new EmpleadoRegister(this.repository, this.encription);
    this.execute(registrarEmpleado, req.body, res);
  }

  public static async getAll(req, res) {
    try {
      const empleados = await this.repository.getAllActivesEmpleados();
      res.json(empleados);
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  public static async delete(req, res) {
    const DespedirEmpleado = new EmpleadoDespido(this.repository);
    this.execute(DespedirEmpleado, req.body.empleadoId, res);
  }

  public static async getEmpleado(req, res) {
    const empleado = await this.repository.find(req.params.id);
    
    res.json({data : empleado});
  }

  public static async update(req, res) {
    const empleado = EmpleadoFactory.makeEmpleado(req.body);
    await this.repository.update(empleado);
    res.json({ data: "ok" })
  }
}

module.exports = EmpleadoController;
