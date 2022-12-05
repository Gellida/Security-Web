export type DepartamentoData = {
    iddepartamento: string;
    nombre: string;
    rfc: string;
    telefono: string;
    domicilio: string;
}

interface DepartamentoDataInterface extends DepartamentoData{};

export class Departamento implements DepartamentoDataInterface {
    constructor (
        public iddepartamento: string,
        public nombre: string,
        public rfc: string,
        public telefono: string,
        public domicilio: string,
    ){}
}