import { EmpresaRegister } from "../aplication/registrarEmpresa";
import { MySqlEmpresaRepository } from "./mySqlEmpresaRepository";

export class EmpresaController {
    static repository = new MySqlEmpresaRepository();

    static async registerEmpresa(req, res) {
        let registarEmpresa = new EmpresaRegister(this.repository);
        try {
            await registarEmpresa.start(req.body);
            res.json({ data: "Empresa registrada correctamente" });
        } catch (error) {
            res.json({ error: error.message });
        }
    }

    static async getAll(req, res) {
        try {
            const data = await this.repository.findAll();
            res.json(data);
        } catch (error) {
            res.json({ error: error.message });
        }
    }


    public static async getEmpresa(req, res) {
        const empresa = await this.repository.find();
        res.json({ data: empresa });
    }

    public static async update(req, res) {
        try {
            console.log(req.body,"controller");
            await this.repository.update(req.body)
            await res.json({ data: "ok" })
        } catch (e) {
            console.log(e,"controller");
            
            res.json({ error:  e.message})
        }
    }
}

module.exports = EmpresaController;