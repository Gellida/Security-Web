import { CRUD } from "../../domainProvider/CRUD";
import { Departamento } from "./departamentoModel";

export interface DepartamentoRepository extends CRUD<Departamento> {
    findByName(name: string): Promise<Departamento>
    findAll(): Promise<Array<Departamento>>;
}