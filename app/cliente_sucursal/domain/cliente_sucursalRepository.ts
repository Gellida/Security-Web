import { CRUD } from "../../domainProvider/CRUD";
import { SucursalCliente } from "./cliente_sucursalModel";

export interface SucursalClienteRepository extends CRUD <SucursalCliente> {
    findAllFromeSucursal(idcliente: string): Promise<Array<SucursalCliente>>;
    findByName(name: string): Promise<SucursalCliente>
}