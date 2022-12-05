import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { ClienteFactory } from "../domain/clienteFactory";
import { Cliente } from "../domain/ClienteModel";
import { ClienteRepository } from "../domain/ClienteRepository";

export class MySqlClienteRepository implements ClienteRepository {
    async getAllActivesClientes(): Promise<Cliente[]> {
        const data = await MySqlDataBase.queryExecute("SELECT tblc_cliente.clienteid AS clienteId, tblc_cliente.nombre AS name, tblc_cliente.direccion, tblc_cliente.rfc, tblc_cliente.contacto_persona, tblc_cliente.puesto, tblc_cliente.celular AS phoneNumber, tblc_cliente.email, tblc_cliente.feccap, tblc_cliente.idestatus FROM tblc_cliente WHERE idestatus = 1");
        return ClienteFactory.makeClienteArray(data);
    }

    async findCliente(name: string): Promise<Cliente> {
        const data = await MySqlDataBase.queryExecute("SELECT tblc_cliente.clienteid AS clienteId, tblc_cliente.nombre AS name, tblc_cliente.direccion, tblc_cliente.rfc, tblc_cliente.contacto_persona, tblc_cliente.puesto, tblc_cliente.celular AS phoneNumber, tblc_cliente.email, tblc_cliente.feccap, tblc_cliente.idestatus FROM tblc_cliente WHERE nombre = '" + name + "'");
        return ClienteFactory.makeCliente(data);
    }
    /*
    async SearchClienteByName(name: string): Promise<Cliente[]> {
        const data = await MySqlDataBase.queryExecute("SELECT tblc_cliente.clienteid AS clienteId, tblc_cliente.nombre AS name, tblc_cliente.direccion, tblc_cliente.rfc, tblc_cliente.contacto_persona, tblc_cliente.puesto, tblc_cliente.celular AS phoneNumber, tblc_cliente.email, tblc_cliente.feccap, tblc_cliente.idestatus FROM tblc_cliente WHERE nombre LIKE %'"+ name + "'% ");
        console.log(data);        
        return ClienteFactory.makeClienteArray(data);
    } 
    
    */

    async save(data: Cliente): Promise<void> {
        await MySqlDataBase.queryExecute("INSERT INTO tblc_cliente (nombre, direccion, rfc, contacto_persona, puesto, celular, email, feccap, idestatus) VALUES ('" + data.name + "', '" + data.direccion + "', '" + data.rfc + "', '" + data.contacto_persona + "', '" + data.puesto + "','" + data.phoneNumber + "', '" + data.email + "', '" + data.feccap + "', '" + data.idestatus + "')");
    }

    async find(clienteid: string): Promise<Cliente> {
        const data = await MySqlDataBase.queryExecute("SELECT tblc_cliente.clienteid AS clienteId, tblc_cliente.nombre AS name, tblc_cliente.direccion, tblc_cliente.rfc, tblc_cliente.contacto_persona, tblc_cliente.puesto, tblc_cliente.celular AS phoneNumber, tblc_cliente.email, tblc_cliente.feccap, tblc_cliente.idestatus FROM tblc_cliente WHERE clienteid = '" + clienteid + "'");
        return ClienteFactory.makeCliente(data[0]);
    }
    async update(newData: Cliente): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_cliente SET nombre = '"+newData.name+"',direccion = '"+newData.direccion+"',rfc = '"+newData.rfc+"',contacto_persona = '"+newData.contacto_persona+"',puesto = '"+newData.puesto+"',celular = '"+newData.phoneNumber+"',feccap = '"+newData.feccap+"' WHERE clienteid = "+newData.clienteId+" ");
        console.log("dataaaa :" +newData.clienteId);
        
    }
    async delete(id: string): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_cliente SET idestatus = 2 WHERE clienteid = "+id+" ");
    }
}