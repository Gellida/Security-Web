import { CRUD } from "../../domainProvider/CRUD";
import { Gasto } from "./GastoModel";

export interface GastoRepository extends CRUD<Gasto> {
    findByConcepto(name: string): Promise<Gasto>
    findAll(): Promise<Array<Gasto>>;
}