import { Factory } from "../../domainProvider/Factory";
import { OrdenCompra, OrdenCompraDetails, ServicioCounter, ServicioCounterDetails } from "./ordenCompraModel";

export class OrdenCompraFactory extends Factory<OrdenCompra> {
    make(data: any): OrdenCompra {
        return new OrdenCompra(
            data.ordenCompraId,
            data.clienteId,
            data.sucursalId,
            data.fechaRegistro,
            data.status,
            this.makeServicioCounter(data.serviciosIds),
            data.precioOpcional
        );
    }
    cleanMeake(): OrdenCompra {
        return new OrdenCompra("","","",new Date(),"",[], 0)
    }
    makeServicioCounter(serviciosIds: Array<any>): Array<ServicioCounter> {
        return serviciosIds.map((servicioCounter) => {
            return new ServicioCounter(servicioCounter.cantidadDeServicios,servicioCounter.servicioId);
        });
    }
}

export class OrdenCompraFactoryDetails extends OrdenCompraFactory {
    make(data: any): OrdenCompra {
        return new OrdenCompraDetails(
            data.ordenCompraId,
            data.clienteId,
            data.sucursalId,
            data.fechaRegistro,
            data.status,
            this.makeServicioCounter(data.serviciosIds),
            data.precioOpcional
        );
    }
    makeServicioCounter(serviciosIds: Array<any>): Array<ServicioCounterDetails> {
        return serviciosIds.map((servicioCounter) => {
            return new ServicioCounterDetails(servicioCounter.servicio,servicioCounter.cantidadDeServicios);
        });
    }
}