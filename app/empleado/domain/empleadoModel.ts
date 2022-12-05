export class Empleado implements EmpleadoDataInterface{
  constructor(
    public empleadoId: string,
    public userName: string,
    public name: string,
    public fatherLastName: string,
    public motherLastName: string,
    public rfc: string,
    public numeroSeguroSocial: string,
    public email: string,
    public phoneNumber: string,
    private password: string,
    public fechaContratacion: Date,
    public fechaNacimiento: Date,
    public status: Number,
    public permisos: Number,
    public estadoCivil: string,
    public idempresa: string,
    public curp: string,
    public sexo: string
  ) {}

  passwordCheck(password: string): boolean {
    return this.password == password;
  }

  passwordSet(pass: string): void {
    this.password = pass;
  }

  passwordGet(): string {
    return this.password;
  }

  fullName(): string {
    return this.name + " " + this.fatherLastName + " " + this.motherLastName;
  }

  permissions(): string {
    if (this.permisos == 1) return "Administrador general";
    if (this.permisos == 2) return "Gerente general";
    if (this.permisos == 3) return "Gerente de empresa / sucursal";
    if (this.permisos == 4) return "Recursos humanos";
    if (this.permisos == 5) return "Jurídico";
    if (this.permisos == 6) return "Auxiliares";
    if (this.permisos == 7) return "Elementos";
    throw new Error("Permisos inválidos");
  }

  isActive(): boolean {
    return this.status == 1;
  }
}

interface EmpleadoDataInterface extends EmpleadoData {}

export type EmpleadoData = {
  empleadoId: string,
  userName: string,
  name: string,
  fatherLastName: string,
  motherLastName: string,
  rfc: string,
  numeroSeguroSocial: string,
  email: string,
  phoneNumber: string,
  fechaContratacion: Date,
  fechaNacimiento: Date,
  status: Number,
  permisos: Number,
  estadoCivil: string,
  idempresa: string,
  curp: string
  sexo: string
};