import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { DepartamentoBuilder } from "../domain/departamentoBuilder";
import { Departamento } from "../domain/departamentoModel";
import { DepartamentoRepository } from "../domain/departamentoRepository";

export class MySqlDepartamentoRepository implements DepartamentoRepository {
    async findAll(): Promise<Departamento[]> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_departamento");
        const misDepartamentos = (new DepartamentoBuilder(data)).buildList();
        return misDepartamentos;
    }

    async findByName(name: string): Promise<Departamento> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_departamento WHERE nombre = '"+name+"'");
        const departamento = (new DepartamentoBuilder(data)).build();
        return departamento;
    }
    async save(data: Departamento): Promise<void> {
        await MySqlDataBase.queryExecute("INSERT INTO tblc_departamento (nombre, rfc, telefono, domicilio) VALUES ('"+data.nombre+"','"+data.rfc+"','"+data.telefono+"','"+data.domicilio+"')");
    }
    async find(id: string): Promise<Departamento> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_departamento WHERE iddepartamento = "+id+"'")[0];
        const departamento = (new DepartamentoBuilder(data)).build();
        return departamento;
    }
    update(newData: Departamento): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}