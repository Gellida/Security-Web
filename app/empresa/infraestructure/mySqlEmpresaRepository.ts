import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { EmpresaBuilder } from "../domain/empresaBuilder";
import { Empresa } from "../domain/empresaModel";
import { EmpresaRepository } from "../domain/empresaRepository";

export class MySqlEmpresaRepository implements EmpresaRepository {
    async findAll(): Promise<Empresa[]> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_empresa");
        const misEmpresas = (new EmpresaBuilder(data)).buildList();
        return misEmpresas;
    }

    async findByName(name: string): Promise<Empresa> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_empresa WHERE empresa = '"+name+"'");
        const empresa = (new EmpresaBuilder(data)).build();
        return empresa;
    }
    async save(data: Empresa): Promise<void> {
        await MySqlDataBase.queryExecute("INSERT INTO tblc_empresa (nombre,razon,rfc,curp,colonia,estado,cp,domicilio,municipio,numint,numext,telefono,regimenfiscal,email,sitioweb) VALUES ( '"+data.nombre+"','"+data.razon+"''"+data.rfc+"','"+data.curp+"','"+data.colonia+"','"+data.estado+"','"+data.cp+"','"+data.domicilio+"','"+data.municipio+"','"+data.numint+"''"+data.numext+"','"+data.telefono+"','"+data.regimenfiscal+"','"+data.email+"','"+data.sitioweb+"')");
    }
    async find(): Promise<Empresa> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_empresa");
        const empresa = (new EmpresaBuilder(data)).build();
        return empresa;
    }
    async update(newData: Empresa): Promise<void> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_empresa WHERE 1=1");
        const empresa = (new EmpresaBuilder(data[0])).build();
        await MySqlDataBase.queryExecute("UPDATE tblc_empresa SET nombre = '"+newData.nombre+"', razon = '"+newData.razon+"', rfc = '"+newData.rfc+"', estado = '"+newData.estado+"', cp = '"+newData.cp+"', domicilio = '"+newData.domicilio+"', municipio = '"+newData.municipio+"', numint = '"+newData.numint+"', numext = '"+newData.numext+"', telefono = '"+newData.telefono+"', curp = '"+newData.curp+"', colonia = '"+newData.colonia+"', email = '"+newData.email+"', sitioweb = '"+newData.sitioweb+"', regimenfiscal = '"+newData.regimenfiscal+"'  WHERE idempresa = '"+empresa.idempresa+"'  ");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}