import { MySqlEmpresaRepository } from "../../empresa/infraestructure/mySqlEmpresaRepository";
import { ServiciosGroupedByModalidad } from "../aplication/servicesGroupedBymodalidad";
import { ServicioRegister } from "../aplication/servicioRegister";
import { MySqlServicioRepository } from "./mySqlServicioRepository";
import { ServicioPDF } from "./serviciosFile";

class ServicioController {
  static repository = new MySqlServicioRepository();
  static empresaRepository = new MySqlEmpresaRepository();

  public static async registrar(req, res): Promise<void> {
    let registrarServicio = new ServicioRegister(this.repository);
    try {
      await registrarServicio.start(req.body);
      res.json({ data: "Servicio registrado correctamente" });
    } catch (error) {
      res.json({ error : error.message});
    }
  }

  public static async modificar(req, res): Promise<void> {
    let registrarServicio = new ServicioRegister(this.repository);
    try {
      await registrarServicio.start(req.body);
      res.json({ data: "Servicio modificado correctamente" });
    } catch (error) {
      res.json({ error: error.message });
    }
  }

  public static async getAll(req, res) {
    const servicios = await this.repository.getAllActivesServicios();
    res.json({data : servicios});
  }

  public static async sendCatalogoInPDF(req, res) {
    const agruparServicios = new ServiciosGroupedByModalidad(this.repository);
    const modalidades = await agruparServicios.start(null);
    const empresa = await this.empresaRepository.findAll();
    console.log(empresa);
    
    const pdf = new ServicioPDF();
    pdf.setEmpresa(empresa[0])
    pdf.setCatalogoServiciosGroupByModalida(modalidades).layout().send(res);
  }
}

module.exports = ServicioController;
