import { GastoRegister } from "../aplication/gastoRegister";
import { MySqlGastoRepository } from "./mySqlGastoRepository";

export class GastoController
 {
    static repository = new MySqlGastoRepository();

    static async registerGasto(req, res) {
        let registrarGasto = new GastoRegister(this.repository);
        try {
            await registrarGasto.start(req.body);
            res.json({data : "Gasto registrado correctamente"});
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

module.exports = GastoController;