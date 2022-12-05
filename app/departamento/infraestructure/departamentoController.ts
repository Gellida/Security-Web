import { DepartamentoRegister } from "../aplication/registrarDepartamento";
import { MySqlDepartamentoRepository } from "./mySqlDepartamentoRepository";

export class DepartamentoController
 {
    static repository = new MySqlDepartamentoRepository();

    static async registerDepartamento(req, res) {
        let registrarDepartamento = new DepartamentoRegister(this.repository);
        try {
            await registrarDepartamento.start(req.body);
            res.json({data : "Empresa registrada correctamente"});
        } catch (error) {
            res.json({error : error.message});
        }
    }

    static async getAll(req, res) {
        try {
            const data = await this.repository.findAll();
            res.json(data);
        } catch (error) {
            res.json({ error : error.message });
        }
    }
}

module.exports = DepartamentoController;