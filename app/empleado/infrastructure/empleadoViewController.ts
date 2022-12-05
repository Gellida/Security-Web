const SessionManagment = require("../../infraestructureProvider/sessionManagment");
import { MySqlEmpleadoRepository } from "./mySqlEmpleadoRepository";

export class EmpleadoViewController {
    static repository = new MySqlEmpleadoRepository();

    public static registrarEmpleadoView(req, res) {
        res.render("empleado", { Auth :  SessionManagment.getUser(req)});
    }

    public static actualizarEmpleado(req, res) {
        const empleadoId = req.params.id
        res.render("empleado_update", { Auth : SessionManagment.getUser(req), empleadoId: empleadoId })
    }

    public static async listadoEmpleadoView(req, res) {
        const empleados = await this.repository.getAllActivesEmpleados();
        res.render("empleados_filter", { Auth :  SessionManagment.getUser(req), Empleados : empleados });
    }
}