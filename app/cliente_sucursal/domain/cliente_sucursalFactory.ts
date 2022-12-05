import { SucursalCliente } from "./cliente_sucursalModel";

export class SucursalClienteFactory {
    static MakeSucursalCliente(data: any): SucursalCliente {
        return new SucursalCliente(
            data.sucursalId,
            data.clienteId,
            data.name,
            data.ubicacion,
            data.feccap,
            data.status,
        );
    }

    static MakeEmptySucursal(): SucursalCliente {
        return new SucursalCliente("", "", "", "", new Date() ,"",);
    }

    static MakeSucursalClienteList(data): SucursalCliente[] {
        return data.map(sucursal => this.MakeSucursalCliente(sucursal));
    }
}