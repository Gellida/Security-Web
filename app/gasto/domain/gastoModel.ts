export type GastoData = {
    gastoid: number;
    concepto: string;
    monto: number;
    feccap: Date;
    persona_captura:string;
}

interface GastoDataInterface extends GastoData{};

export class Gasto implements GastoDataInterface {
    constructor (
        public gastoid: number,
        public concepto: string,
        public monto: number,
        public feccap: Date,
        public persona_captura: string,
    ){}
}