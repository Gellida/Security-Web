import { Factory } from "../../domainProvider/Factory";
import { Cotizacion, CotizacionDetails, ServicioCounter, ServicioCounterDetails } from "./cotizacionModel";

export class CotizacionFactory extends Factory<Cotizacion> {
    make(data: any): Cotizacion {
        return new Cotizacion(
            data.cotizacionId,
            data.clienteId,
            data.sucursalId,
            data.fechaRegistro,
            data.status,
            this.makeServicioCounter(data.serviciosIds),
        );
    }
    cleanMeake(): Cotizacion {
        return new Cotizacion("","","",new Date(),"",[])
    }
    makeServicioCounter(serviciosIds: Array<any>): Array<ServicioCounter> {
        return serviciosIds.map((servicioCounter) => {
            return new ServicioCounter(servicioCounter.cantidadDeServicios,servicioCounter.servicioId,servicioCounter.precioCotizado);
        });
    }
}

export class CotizacionFactoryDetails extends CotizacionFactory {
    make(data: any): CotizacionDetails {
        return new CotizacionDetails(
            data.cotizacionId,
            data.clienteId,
            data.sucursalId,
            data.fechaRegistro,
            data.status,
            this.makeServicioCounter(data.serviciosIds),
        );
    }
    cleanMeake(): CotizacionDetails {
        return new CotizacionDetails("","","",new Date(),"",[])
    }
    makeServicioCounter(serviciosIds: Array<any>): Array<ServicioCounterDetails> {
        return serviciosIds.map((servicioCounter) => {
            return new ServicioCounterDetails(servicioCounter.servicio,servicioCounter.cantidadDeServicios,servicioCounter.precioCotizado);
        });
    }
}