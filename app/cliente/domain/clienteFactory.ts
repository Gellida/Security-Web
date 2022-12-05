import { Cliente } from "./clienteModel";

export class ClienteFactory {
    static makeCliente(data: any): Cliente {
        
        return new Cliente(
            data.clienteId,
            data.name,
            data.rfc,
            data.direccion,
            data.contacto_persona ?? "",
            data.puesto ?? "",
            data.phoneNumber ?? "",
            data.email ?? "",
            data.feccap ?? "",
            data.idestatus,
        );
    }

    static makeClienteEmpty(): Cliente {
        return new Cliente("","","","","","","","",Date(),"");
    }
    static getclientes(data: any): Array<Cliente>{
        return data.map((singleData: any) => ClienteFactory.makeCliente(singleData));
    }

    static makeClienteArray(data: any): Array<Cliente> {
        return data.map((singleData: any) => ClienteFactory.makeCliente(singleData));
    }
}