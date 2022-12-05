import { UseCase } from "../../domainProvider/UseCase";
import { ClienteRepository } from "../domain/clienteRepository";

export class ClienteEliminar implements UseCase{
    private DataLayer: ClienteRepository;

    constructor(repository: ClienteRepository) {
        this.DataLayer = repository;
    }
    
    public async start(clienteId: string) {
        await this.existCliente(clienteId);
        await this.delCliente(clienteId);
    }
    private async existCliente(id: string) {
        const cliente = await this.DataLayer.find(id);
        if (cliente.clienteId.toString() != id) throw new Error("El cliente no existe");
        
    }
    private async delCliente(id: string) {
        await this.DataLayer.delete(id);
    }
}