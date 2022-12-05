import { ClienteFactory } from "../domain/clienteFactory";
import { Cliente } from "../domain/clienteModel";
import { ClienteRepository } from "../domain/clienteRepository";

export class TestClienteRepository implements ClienteRepository {
  getAllActivesClientes(): Promise<Cliente[]> {
    throw new Error("Method not implemented.");
  }
  private DB = [
    {
      clienteId: "1",
      name: "Autobuses Expreso Azul S.A DE CV",
      direccion: "Cerca de plaza sol",
      rfc: "AEA010621Q58",
      contacto_persona:"ing Carlos",
      puesto: "gerente admin",
      phoneNumber: "0000000",
      email: "a@email.com",
      feccap: "14/11/22",
      idestatus: "1",
      
    },
  
  ];

  findCliente(userName: string): Promise<Cliente> {
    return new Promise((resolve, rejects) => {
      let data = this.DB.find((cliente) => {
        return userName === cliente.name;
      });
      try {
        const cliente = ClienteFactory.makeCliente(data);
        resolve(cliente);
      } catch(error) {
        rejects(error);
      }
    });
  }

  save(cliente: Cliente): Promise<void> {
    return new Promise((resolve, rejects) => {});
  }
  find(clienteId: String): Promise<Cliente> {
    let data = this.DB.find((cliente) => clienteId === cliente.clienteId);
    if (data == null) throw new Error("cliente no encontrado");
    return new Promise((resolve, rejects) => {
      resolve(ClienteFactory.makeCliente(data));
    });
  }
  update(newData: Cliente): Promise<void> {
    return new Promise((resolve, rejects) => {});
  }
  delete(clienteId: string): Promise<void> {
    return new Promise((resolve, rejects) => {});
  }
}
