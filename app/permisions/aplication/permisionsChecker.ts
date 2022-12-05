import { Empleado } from "../../empleado/domain/empleadoModel";
import { Permision } from "../domain/permisionModel";

export class PermisionsChecker {
    private empleadoToCheck: Empleado;
    private result: boolean;

    constructor(empleadoToCheck: Empleado){
        this.empleadoToCheck = empleadoToCheck;
    }

    valid(): boolean {
        return this.result;
    }

    async is(setPermiso: Permision): Promise<this> {
        let permiso = setPermiso;
        permiso.setEmpleado(this.empleadoToCheck);
        this.result = await permiso.validate();
        return this;
    }

    async isNot(setPermiso?: Permision) {
        if(!setPermiso) this.result = !this.result;
        let permiso = setPermiso;
        permiso.setEmpleado(this.empleadoToCheck);
        this.result = await permiso.validate();
        return this;
    }
}