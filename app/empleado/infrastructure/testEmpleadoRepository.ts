import { EncryptionProvider } from "../../infraestructureProvider/encryptionProvider";
import { EmpleadoFactory } from "../domain/empleadoFactory";
import { Empleado } from "../domain/empleadoModel";
import { EmpleadoRepository } from "../domain/empleadoRepository";
var encrypt = new EncryptionProvider();

export class TestEmpleadoRepository implements EmpleadoRepository {
  getAllActivesEmpleados(): Promise<Empleado[]> {
    throw new Error("Method not implemented.");
  }
  private DB = [
    {
      empleadoId: "1",
      userName: "fran",
      name: "Francisco Alonso",
      fatherLastName: "Salazar",
      motherLastName: "Ballinas",
      rfc: "123",
      curp: "0000",
      numeroSeguroSocial: "0000",
      estadoCivil: "Soltero",
      sexo: "h",
      email: "a@email.com",
      phoneNumber: "0000000",
      password: encrypt.encrypt("password"),
    },
    {
      empleadoId: "2",
      userName: "jose",
      name: "José Manuel",
      fatherLastName: "Gellida",
      motherLastName: "Coutiño",
      rfc: "123",
      curp: "0000",
      numeroSeguroSocial: "0000",
      estadoCivil: "Soltero",
      sexo: "h",
      email: "a@email.com",
      phoneNumber: "0000000",
      password: encrypt.encrypt("password"),
    },
  ];

  findLogin(userName: string): Promise<Empleado> {
    return new Promise((resolve, rejects) => {
      let data = this.DB.find((empleado) => {
        return userName === empleado.userName;
      });
      try {
        const empleado = EmpleadoFactory.makeEmpleado(data);
        resolve(empleado);
      } catch(error) {
        rejects(error);
      }
    });
  }
  save(empleado: Empleado): Promise<void> {
    return new Promise((resolve, rejects) => {});
  }
  find(empleadoId: String): Promise<Empleado> {
    let data = this.DB.find((empleado) => empleadoId === empleado.empleadoId);
    if (data == null) throw new Error("Empleado no encontrado");
    return new Promise((resolve, rejects) => {
      resolve(EmpleadoFactory.makeEmpleado(data));
    });
  }
  update(newData: Empleado): Promise<void> {
    return new Promise((resolve, rejects) => {});
  }
  delete(empleadoId: string): Promise<void> {
    return new Promise((resolve, rejects) => {});
  }
}
