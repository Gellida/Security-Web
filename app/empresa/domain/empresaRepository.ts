import { CRUD } from "../../domainProvider/CRUD";
import { Empresa } from "./empresaModel";

export interface EmpresaRepository extends CRUD<Empresa> {
    findByName(name: string): Promise<Empresa>
    findAll(): Promise<Array<Empresa>>;
}