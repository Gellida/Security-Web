export type EmpresaData = {
    idempresa: string;
    nombre: string;
    razon: string;
    rfc: string;
    curp: string;
    colonia: string;
    domicilio: string;
    estado: string;
    telefono: string;
    cp: string,
    municipio:string;
    numint:string;
    numext:string;
    regimenfiscal:string,
    email:string,
    sitioweb:string
}

interface EmpresaDataInterface extends EmpresaData{};

export class Empresa implements EmpresaDataInterface {
    constructor (
    public idempresa: string,
    public nombre: string,
    public razon: string,
    public rfc: string,
    public curp: string,
    public colonia: string,
    public domicilio: string,
    public estado: string,
    public telefono: string,
    public cp: string,
    public municipio:string,
    public numint:string,
    public numext:string,
    public regimenfiscal:string,
    public email:string,
    public sitioweb:string
    ){}
}