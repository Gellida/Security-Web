import { GastoBuilder } from "../domain/gastoBuilder";
import { Gasto } from "../domain/gastoModel";
import { GastoRepository } from "../domain/gastoRepository";

export class GastoRegister {
    private dataLayer: GastoRepository;
    private newGasto: Gasto;

    constructor(dataProvider: GastoRepository) {
        this.dataLayer = dataProvider;
    }
    
    public async start(data: any) {
        this.makeEmpresaProspect(data);
        this.validateData();
        await this.saveDepartamento();
    }

    private makeEmpresaProspect(data: any): void {
        this.newGasto = (new GastoBuilder(data)).build()
    }
    private validateData(): void {
        if(!this.newGasto.concepto.trim()) throw new Error("Se requiere el concepto del Departamento");;
    }
    private async saveDepartamento() {
        await this.dataLayer.save(this.newGasto);
    }
}