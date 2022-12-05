import { DepartamentoRepository } from "../../departamento/domain/departamentoRepository";
import { UseCase } from "../../domainProvider/UseCase";
import { EmpleadoRepository } from "../../empleado/domain/empleadoRepository";
import { Cotizacion } from "../domain/cotizacionModel";
import { CotizacionRepository, CotizacionSegimientoRepository, CotizacionToOrdenCompraRepository } from "../domain/cotizacionRepository";

export class CotizacionAceptar implements UseCase {
    private orden: CotizacionToOrdenCompraRepository;

    constructor(orden: CotizacionToOrdenCompraRepository){
        this.orden = orden
    }

    async start(data: any): Promise<void> {
        await this.orden.cotizacionUpdate(data.cotizacionId);
    }
}