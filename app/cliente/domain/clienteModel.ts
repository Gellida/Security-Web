export class Cliente {

  constructor(
    public clienteId: string,
    public name: string,
    public rfc: string,
    public direccion: string,
    public contacto_persona: string,
    public puesto: string,
    public phoneNumber: string,
    public email: string,
    public feccap: string,
    public idestatus: string,
  ) { }

  isActive(): boolean {
    return this.idestatus == "1";
  }

  static factory(data?: ClienteData): Cliente {
    if (data == null) throw new Error("Empleado no encontrado")
    return new Cliente(data.clienteId, data.name, data.direccion, data.rfc, data.contacto_persona, data.puesto, data.phoneNumber, data.email, data.feccap, data.idestatus);
  }

  static parserData(data?: any): ClienteData {
    try {
      let cliente = {
        clienteId: data.clienteId.toString() ?? "",
        name: data.name.toString() ?? "",
        direccion: data.direccion.toString() ?? "",
        rfc: data.rfc.toString() ?? "",
        contacto_persona: data.contacto_persona.toString() ?? "",
        puesto: data.puesto.toString() ?? "",
        phoneNumber: data.phoneNumber.toString() ?? "",
        email: data.email.toString() ?? "",
        feccap: data.feccap.toString() ?? "",
        idestatus: data.idestatus.toString() ?? "",
      }
      return cliente;
    } catch (error) {
      throw new Error("cliente Invalid input");
    }
  }

  factureName(): String {
    return this.name
      .replace('.', '')
      .replace('SA', '')
      .replace('SA DE CV', '')
      .replace('S DE RL', '')
      .replace('S DE RL DE CV', '')
      .replace('SAS', '')
      .replace('SC', '');
  }

  RfcAndNameToUpperCase(): void {
    this.name = this.name.toUpperCase();
    this.rfc = this.rfc.toUpperCase();
  }

}
export type ClienteData = {
  clienteId: string,
  name: string,
  direccion: string,
  rfc: string,
  contacto_persona: string,
  puesto: string,
  phoneNumber: string,
  email: string,
  feccap: string,
  idestatus: string,
};



