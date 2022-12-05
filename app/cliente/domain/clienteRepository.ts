import { CRUD } from "../../domainProvider/CRUD";
import { Cliente } from "./clienteModel";

export interface ClienteRepository extends CRUD<Cliente>{
    findCliente(name: string): Promise<Cliente>;
    getAllActivesClientes(): Promise<Array<Cliente>>

     /*
     SearchClienteByName(): Promise<Array<Cliente>>
    */
   
}