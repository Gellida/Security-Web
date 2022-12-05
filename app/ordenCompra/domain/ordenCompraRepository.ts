import { CRUD } from "../../domainProvider/CRUD";
import { Servicio } from "../../servicio/domain/servicioModel";
import { OrdenCompraFactory } from "./ordenCompraFactory";
import { OrdenCompra } from "./ordenCompraModel";

export interface OrdenCompraRepository extends CRUD<OrdenCompra> {}
export interface OrdenCompraRepositoryReferences {
    getOrdenCompraByCliente(clienteId: string): OrdenCompra;
    getServiciosInOrdenCompra(serviciosIds: Array<string>): Array<Servicio>
}