const SessionManagment = require("../../infraestructureProvider/sessionManagment");
import { MySqlEmpresaRepository } from "./mySqlEmpresaRepository";

export class EmpresaViewController {
    static repository = new MySqlEmpresaRepository();

    public static actualizarEmpresa(req, res) {
        const idempresa = req.params.id
        res.render("empresa_filter", { idempresa: idempresa })
    }

}