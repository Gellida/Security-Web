import { Empleado } from "./empleadoModel";

export class EmpleadoFactory {
    static makeEmpleado(data: any): Empleado {
        return new Empleado(
            data.empleadoId,
            data.userName,
            data.name,
            data.fatherLastName,
            data.motherLastName,
            data.rfc,
            data.numeroSeguroSocial,
            data.email,
            data.phoneNumber,
            data.password,
            data.fechaContratacion,
            data.fechaNacimiento,
            data.status,
            data.permisos,
            data.estadoCivil,
            data.idempresa,
            data.curp,
            data.sexo
        );
    }

    static makeEmptyEmpleado(): Empleado {
        return new Empleado("", "", "", "", "", "", "", "", "", "", new Date(), new Date(), 1, 1, "", "", "", "");
    }

    static makeEmpleadoArray(data: any): Array<Empleado> {
        return data.map((singleData: any) => EmpleadoFactory.makeEmpleado(singleData));
    }
}