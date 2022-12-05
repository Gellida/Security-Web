import { Empleado } from "../../empleado/domain/empleadoModel";
import { PermisionType } from "./permisionModel";

export interface PermisionRepository {
    getAllTypesOfPermisions(): Promise<Array<PermisionType>>
    getEmpleadoPermission(empleado: Empleado): Promise<PermisionType>
}