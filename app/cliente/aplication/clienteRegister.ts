import { ClienteFactory } from "../domain/clienteFactory";
import { Cliente, ClienteData } from "../domain/clienteModel";
import { ClienteRepository } from "../domain/clienteRepository";

export class ClienteRegister {
  private DataLayer: ClienteRepository;
  private clienteToRegister: Cliente;

  constructor(repository: ClienteRepository) {
    this.DataLayer = repository;
  }

  async start(data: any) {
    this.makeCliente(data);
    this.validateData();
    await this.nameExist();
    await this.registerNewCliente();
  }

  private makeCliente(data: any): void {
    
    this.clienteToRegister = ClienteFactory.makeClienteEmpty();
    this.clienteToRegister.name = data?.name ?? "";
    this.clienteToRegister.direccion = data?.direccion ?? "";
    this.clienteToRegister.rfc = data?.rfc ?? "";
    this.clienteToRegister.email = data?.email ?? "";
    this.clienteToRegister.feccap = data?.feccap ?? new Date();
    this.clienteToRegister.idestatus = "1";
  }

  private validateData(): void {
    if (this.clienteToRegister.name.trim() == "") throw new Error("El cliente necesita un nombre");
    if (this.clienteToRegister.rfc.trim() == "") throw new Error("rfc del cliente requerido");
  }

  private async nameExist(): Promise<void> {
    try {
      if (await this.DataLayer.findCliente(this.clienteToRegister.name)) throw new Error("nombre "+ this.clienteToRegister.name +" ya existe, favor de usar otra empresa");
    } catch {}
  }

  private async registerNewCliente() {
    await this.DataLayer.save(this.clienteToRegister);
  }
}
