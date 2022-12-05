import { Empleado } from "../../empleado/domain/empleadoModel";

export abstract class Permision {
    protected empleadoToValidate: Empleado;
    protected isValid: boolean;

    setEmpleado(toValidate: Empleado) {
        this.empleadoToValidate = toValidate;
    }

    validate(): Promise<boolean> {
        return new Promise( async (resolve) => {
            await this.chek();
            resolve(this.isValid);
        });
    }

    abstract chek();
}

export type PermisionType = {
    id: string,
    name: string
}