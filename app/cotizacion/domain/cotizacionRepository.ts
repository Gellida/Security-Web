import { CRUD } from "../../domainProvider/CRUD";
import { Servicio } from "../../servicio/domain/servicioModel";
import { CotizacionFactory } from "./cotizacionFactory";
import { Cotizacion, CotizacionDetails } from "./cotizacionModel";
import { Seguimiento } from "./cotizacionSegimientoModel";

export interface CotizacionRepository extends CRUD<Cotizacion> {
    findDitels(cotizacionId: string): Promise<CotizacionDetails>;
}
export interface CotizacionRepositoryReferences {
    getCotizacionByCliente(clienteId: string): Cotizacion;
    getServiciosInCotizacion(serviciosIds: Array<string>): Array<Servicio>
}

export interface CotizacionToOrdenCompraRepository {
    cotizacionUpdate(cotizacionId: string): Promise<void>;
    getAceptedCotizacion(): Promise<Cotizacion[]>
}

export interface CotizacionSegimientoRepository {
    getSegimientoByCotizacion(cotizacionId: string): Promise<Seguimiento[]>;
    saveNewSegimientos(seguimientos: Seguimiento[]): Promise<void>;
    updateSegimiento(seguimiento: Seguimiento): Promise<void>;
}