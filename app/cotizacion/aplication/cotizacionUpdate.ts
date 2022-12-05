import { UseCase } from "../../domainProvider/UseCase";
import { Cotizacion, ServicioCounter } from "../domain/cotizacionModel";
import { CotizacionRepository } from "../domain/cotizacionRepository";

export class CotizacionUpdate implements UseCase {
    private repository: CotizacionRepository;
    private cotizacionId: string;
    private servicios: Array<ServicioCounter>
    private cotizacion: Cotizacion;
    private serviciosCancelados: Array<any>;

    constructor(respository: CotizacionRepository) {
        this.repository = respository;
    }
    async start(data: any): Promise<any> {
        this.setData(data)
        await this.getCotizacion();
        this.setServiciosActualizados();
        await this.saveChanges();
    }

    private setData(data) {
        this.servicios = data.serviciosIds;
        this.cotizacionId = data.cotizacionId
        this.serviciosCancelados = data.serviciosCanceladosIds;
    }
    private async getCotizacion() {
        this.cotizacion = await this.repository.find(this.cotizacionId);
    }
    private setServiciosActualizados() {
        this.cotizacion.serviciosIds = this.servicios;
        this.cotizacion.serviciosIds = this.cotizacion.serviciosIds.filter(servicio => !this.serviciosCancelados.find(servicioCanceladoId => servicioCanceladoId == servicio.servicioId))
    }
    private async saveChanges() {
        await this.repository.update(this.cotizacion);
    }
}