import { UseCase } from "../../domainProvider/UseCase";
import { EncryptionProvider } from "../../infraestructureProvider/encryptionProvider";
import { Empleado } from "../domain/empleadoModel";
import { EmpleadoRepository } from "../domain/empleadoRepository";
import { EmpleadoLoginEvent } from "./empleadoLoginEvent";

export class EmpleadoLogin implements UseCase{
  private DataLayer: EmpleadoRepository;
  private encrypter: EncryptionProvider;
  private userName: string;
  private pass: string;
  private empleado: Empleado;

  constructor(repository: EmpleadoRepository, encrypter: EncryptionProvider) {
    this.DataLayer = repository;
    this.encrypter = encrypter;
  }

  async start(data): Promise<Empleado> {
    this.parserData(data);
    this.validateData();
    this.encryptPassword();
    await this.getEmpleado();
    this.validatePassword();
    this.validateStatus();
    return this.empleado;
  }

  private parserData(data): void {
    this.userName = data.userName ?? "";
    this.pass = data.pass ?? "";
  }

  private validateData(): void {
    if (this.userName.trim() == "") throw new Error("Usuario vacio");
    if (this.pass.trim() == "") throw new Error("Contraseña Vacia");
  }

  private encryptPassword(): void {
    this.pass = this.encrypter.encrypt(this.pass);
  }

  private async getEmpleado(): Promise<void> {
    this.empleado = await this.DataLayer.findLogin(this.userName);
    if (!this.empleado.empleadoId || this.empleado.empleadoId === "") throw new Error("Empleado no encontrado");
    new EmpleadoLoginEvent(this.empleado);
  }
  private validateStatus(): void {
    if(!this.empleado.isActive()) throw new Error("Usuario inactivo");
  }
  private validatePassword(): void {
    if (!this.empleado.passwordCheck(this.pass)) throw new Error("Contraseña incorrecta");
  }
}
