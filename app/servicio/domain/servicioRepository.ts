import { CRUD } from "../../domainProvider/CRUD";
import { Servicio } from "./servicioModel";

export interface ServicioRepository extends CRUD<Servicio>{
    findServicio(name: string): Promise<Servicio>;
    getAllActivesServicios(): Promise<Array<Servicio>>
}