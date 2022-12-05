import { UseCase } from "../../domainProvider/UseCase";
import { EncryptionProvider } from "../../infraestructureProvider/encryptionProvider";
import { EmpleadoFactory } from "../domain/empleadoFactory";
import { Empleado} from "../domain/empleadoModel";
import { EmpleadoRepository } from "../domain/empleadoRepository";

export class EmpleadoRegister implements UseCase{
  private DataLayer: EmpleadoRepository;
  private encrypter: EncryptionProvider;
  private empleadoToRegister: Empleado;

  constructor(repository: EmpleadoRepository, encrypter: EncryptionProvider) {
    this.DataLayer = repository;
    this.encrypter = encrypter;
  }

  async start(data: any) {
    this.makeEmpleado(data);
    this.validateData();
    await this.userNameExist();
    this.encryptPassword();
    await this.registerNewEmpleado();
  }

  private makeEmpleado(data: any): void {
    this.empleadoToRegister = EmpleadoFactory.makeEmpleado(data);
  }

  private validateData(): void {
    if (this.empleadoToRegister.userName.trim() == "") throw new Error("nombre único de usuario requerido");
    if (this.empleadoToRegister.name.trim() == "") throw new Error("nombre del empleado requerido");
    if (this.empleadoToRegister.rfc.trim() == "") throw new Error("rfc del empleado requerido");
    if (this.empleadoToRegister.curp.trim() == "") throw new Error("curp del empleado requerida");
    if (this.empleadoToRegister.passwordGet().trim() == "") throw new Error("contraseña del empleado requerida");
  }

  private async userNameExist() {
    const empleado = await this.DataLayer.findLogin(this.empleadoToRegister.userName);
    if (empleado.empleadoId) throw new Error("El nombre de usuario <"+ this.empleadoToRegister.userName +"> ya existe, favafor de usar otro nombre");
  }

  private encryptPassword(): void {
    const pass = this.encrypter.encrypt(this.empleadoToRegister.passwordGet());
    this.empleadoToRegister.passwordSet(pass);
  }
  
  private async registerNewEmpleado() {
    await this.DataLayer.save(this.empleadoToRegister);
  }
}
