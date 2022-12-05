import { Cliente } from "../domain/clienteModel";
import { ClienteRepository } from "../domain/clienteRepository";

export class findByCliente {
  private DataLayer: ClienteRepository;
  private name: string;
  private cliente: Cliente;

  constructor(repository: ClienteRepository) {
    this.DataLayer = repository;
  }

  async start(name: string): Promise<Cliente> {
    this.name = name;
    this.validateData();
    await this.getCliente();
    this.validateStatus();
    return this.cliente;
  }

  private validateData(): void {
    if (this.name.trim() == "") throw new Error("Usuario vacio");
  }
  private validateStatus(): void {
    if(!this.cliente.isActive()) throw new Error("Usuario inactivo");
  }

  private async getCliente(): Promise<void> {
    this.cliente = await this.DataLayer.findCliente(this.name);
    if (!this.cliente.name || this.cliente.clienteId === "") throw new Error("Cliente no encontrado");
  }

}
