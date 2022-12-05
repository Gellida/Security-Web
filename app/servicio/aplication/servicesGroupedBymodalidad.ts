import { UseCase } from "../../domainProvider/UseCase";
import { Servicio } from "../domain/servicioModel";
import { ServicioRepository } from "../domain/servicioRepository";

export class ServiciosGroupedByModalidad implements UseCase {
    protected servicioRepo: ServicioRepository;
    protected order: (origin: Map<string, Servicio[]>) => Map<string, Servicio[]> //reglas de ordenamiento

    constructor(repo: ServicioRepository) {
        this.servicioRepo = repo;
        this.order = this.defaultOrder;
    }

    setOrder(orderRule: (origin: Map<string, Servicio[]>) => Map<string, Servicio[]>): void { //se puede cambiar la forma de ordenar dinámicamente
        this.order = orderRule;
    }

    async start(data: any): Promise<Map<string, Servicio[]>> {
        let salida = new Map<string, Servicio[]>();
        let servicios = await this.servicioRepo.getAllActivesServicios();
        servicios.forEach((servicio) => {
            !salida.get(servicio.modalidad) ? 
            salida.set(servicio.modalidad,[servicio])  : 
            salida.get(servicio.modalidad).push(servicio);
        });
        return this.order(salida);
    }

    public defaultOrder(data: Map<string, Servicio[]>): Map<string, Servicio[]>{
        const modalidades = Array.from(data.keys());
        const salida = new Map<string, Servicio[]>();
        modalidades.sort((a,b) => {
            if(a == "Básico" && b != "Básico") return -1;
            else return 1 
        }).forEach(modalidad => salida.set(modalidad, data.get(modalidad)));
        return salida;
    }
}