import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { EmpleadoFactory } from "../domain/empleadoFactory";
import { Empleado } from "../domain/empleadoModel";
import { EmpleadoRepository } from "../domain/empleadoRepository";

export class MySqlEmpleadoRepository implements EmpleadoRepository {
    async getAllActivesEmpleados(): Promise<Empleado[]> {
        const data = await MySqlDataBase.queryExecute("SELECT idusua AS empleadoId, nombre AS name, paterno AS fatherLastName, materno as motherLastName, celular as phoneNumber, correo AS email, nss AS numeroSeguroSocial, rfc AS rfc, fecnac AS fechaNacimiento, idpermiso AS permisos, idestatus AS status, feccap AS fechaContratacion, pass AS password, user_name as userName, sexo as sexo, curp as curp, estadocivil AS estadoCivil, idempresa FROM tblc_usuario WHERE idestatus = 1");
        return EmpleadoFactory.makeEmpleadoArray(data);
    }
    async findLogin(userName: string): Promise<Empleado> {
        const data = await MySqlDataBase.queryExecute("SELECT idusua AS empleadoId, nombre AS name, paterno AS fatherLastName, materno as motherLastName, celular as phoneNumber, correo AS email, nss AS numeroSeguroSocial, rfc AS rfc, fecnac AS fechaNacimiento, idpermiso AS permisos, idestatus AS status, feccap AS fechaContratacion, pass AS password, user_name as userName, sexo as sexo, curp as curp, estadocivil AS estadoCivil, idempresa FROM tblc_usuario WHERE  user_name = '"+userName+"'");
        return data[0] ? EmpleadoFactory.makeEmpleado(data[0]) : EmpleadoFactory.makeEmptyEmpleado();
    }
    async save(data: Empleado): Promise<void> {
        await MySqlDataBase.queryExecute("INSERT INTO tblc_usuario (idusua, user_name, nombre, paterno, materno, rfc, nss, correo, celular, pass, fecnac, feccap, idpermiso, idestatus, idempresa) VALUES ('"+data.empleadoId+"', '"+data.userName+"', '"+data.name+"', '"+data.fatherLastName+"', '"+data.motherLastName+"', '"+data.rfc+"','"+data.numeroSeguroSocial+"', '"+data.email+"', '"+data.phoneNumber+"', '"+data.passwordGet()+"', '"+data.fechaNacimiento+"', '"+data.fechaContratacion+"', '"+data.permisos+"','"+data.status+"')");
    }
    async find(id: string): Promise<Empleado> {
        const data = await MySqlDataBase.queryExecute("SELECT idusua AS empleadoId, nombre AS name, paterno AS fatherLastName, materno as motherLastName, celular as phoneNumber, correo AS email, nss AS numeroSeguroSocial, rfc AS rfc, fecnac AS fechaNacimiento, idpermiso AS permisos, idestatus AS status, feccap AS fechaContratacion, pass AS password, user_name as userName, sexo as sexo, curp as curp, estadocivil AS estadoCivil, idempresa FROM tblc_usuario WHERE idusua = '"+id+"'");
        return EmpleadoFactory.makeEmpleado(data[0]);
    }
    async update(newData: Empleado): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_usuario SET pass = '"+newData.passwordGet()+"', user_name = '"+newData.userName+"', celular = '"+newData.phoneNumber+"', correo = '"+newData.email+"', idpermiso = "+newData.permisos+", estadocivil = '"+newData.estadoCivil+"', idempresa = "+newData.idempresa+" WHERE idusua = "+newData.empleadoId+" ");
    }
    async delete(id: string): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_usuario SET idestatus = 2 WHERE idusua = "+id+" ");
    }
}