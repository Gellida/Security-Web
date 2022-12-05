import { EmpresaBuilder } from "../domain/empresaBuilder";
import { Empresa } from "../domain/empresaModel";
import { EmpresaRepository } from "../domain/empresaRepository";

export class EmpresaRegister {
    private dataLayer: EmpresaRepository;
    private newEmpresa: Empresa;

    constructor(dataProvider: EmpresaRepository) {
        this.dataLayer = dataProvider;
    }
    
    public async start(data: any) {
        this.makeEmpresaProspect(data);
        this.validateDat();
        
        await this.saveEmpresa();
    }

    private makeEmpresaProspect(data: any): void {
        this.newEmpresa = (new EmpresaBuilder(data)).build()
    }
    private validateDat(): void {
        if(!this.newEmpresa.nombre.trim()) throw new Error("Se requiere el nombre de la nueva sucursal");
        if(!this.newEmpresa.rfc.trim()) throw new Error("Se requiere el rfc de la nueva sucursal");
    }

    private async saveEmpresa() {
        await this.dataLayer.save(this.newEmpresa);
    }
}