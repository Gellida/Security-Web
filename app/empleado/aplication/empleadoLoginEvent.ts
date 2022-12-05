import { DomainEvent } from "../../domainProvider/DomainEvent";
import { Empleado } from "../domain/empleadoModel";

export class EmpleadoLoginEvent extends DomainEvent {
    public empleado: Empleado;
    constructor(loginEmpleado: Empleado) {
        super();
        this.empleado = loginEmpleado;
        this.send();
    }
}