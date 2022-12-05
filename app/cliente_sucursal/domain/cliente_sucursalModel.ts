export class SucursalCliente {

    constructor(
        public sucursalId: string,
        public clienteId: string,
        public name: string,
        public ubicacion: string,
        public feccap: Date,
        public status: string
    ) {};
}   