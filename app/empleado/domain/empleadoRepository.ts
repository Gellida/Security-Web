import { CRUD } from "../../domainProvider/CRUD";
import { Empleado } from "./empleadoModel";

export interface EmpleadoRepository extends CRUD<Empleado>{
    findLogin(userName: string): Promise<Empleado>;
    getAllActivesEmpleados(): Promise<Array<Empleado>>
}
