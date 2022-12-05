import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { SucursalClienteFactory } from "../domain/cliente_sucursalFactory";
import { SucursalCliente } from "../domain/cliente_sucursalModel";
import { SucursalClienteRepository } from "../domain/cliente_sucursalRepository";

export class SucursalClienteMySqlRepository implements SucursalClienteRepository {
    async findAllFromeSucursal(idcliente: string): Promise<SucursalCliente[]> {
        const data = await MySqlDataBase.queryExecute("SELECT tblc_cliente_sucursal.idubicacion AS sucursalId, tblc_cliente_sucursal.idcliente AS clienteId,tblc_cliente_sucursal.ubicacion AS ubicacion,tblc_cliente_sucursal.feccap,tblc_cliente_sucursal.idestatus AS `status`, tblc_cliente_sucursal.nombre AS name FROM tblc_cliente_sucursal WHERE idcliente = "+idcliente);
        return SucursalClienteFactory.MakeSucursalClienteList(data);
    }
    async findByName(name: string): Promise<SucursalCliente> {
        const data = await MySqlDataBase.queryExecute("SELECT tblc_cliente_sucursal.idubicacion AS sucursalId, tblc_cliente_sucursal.idcliente AS clienteId,tblc_cliente_sucursal.ubicacion AS ubicacion,tblc_cliente_sucursal.feccap,tblc_cliente_sucursal.idestatus AS `status`, tblc_cliente_sucursal.nombre AS name FROM tblc_cliente_sucursal WHERE nombre = '"+name+"'");
        return data[0] ? SucursalClienteFactory.MakeSucursalCliente(data) : SucursalClienteFactory.MakeEmptySucursal();
    }
    async save(data: SucursalCliente): Promise<void> {
        await MySqlDataBase.queryExecute("INSERT INTO tblc_cliente_sucursal ( idcliente, ubicacion, feccap, idestatus, nombre)  VALUES ('"+data.clienteId+"', '"+data.ubicacion+"', '"+ new Date() +"', "+1+", '"+data.name+"')");
    }
    async find(id: string): Promise<SucursalCliente> {
        const data = await MySqlDataBase.queryExecute("SELECT tblc_cliente_sucursal.idubicacion AS sucursalId, tblc_cliente_sucursal.idcliente AS clienteId,tblc_cliente_sucursal.ubicacion AS ubicacion,tblc_cliente_sucursal.feccap,tblc_cliente_sucursal.idestatus AS `status`, tblc_cliente_sucursal.nombre AS name FROM tblc_cliente_sucursal WHERE idubicacion = "+id);
        return SucursalClienteFactory.MakeSucursalCliente(data[0]);
    }
    async update(newData: SucursalCliente): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_cliente_sucursal SET nombre = '"+newData.name+"', ubucacion = '"+newData.ubicacion+"' WHERE idubicacion = "+newData.sucursalId);
    }
    async delete(id: string): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_cliente_sucursal SET idestatus = 2 WHERE idubicacion = "+id);
    }
}