import { DepartamentoBuilder } from "../domain/departamentoBuilder";
import { Departamento } from "../domain/departamentoModel";
import { DepartamentoRepository } from "../domain/departamentoRepository";

export class DepartamentoRegister {
    private dataLayer: DepartamentoRepository;
    private newDepartamento: Departamento;

    constructor(dataProvider: DepartamentoRepository) {
        this.dataLayer = dataProvider;
    }
    
    public async start(data: any) {
        this.makeEmpresaProspect(data);
        this.validateDat();
        await this.departamentoIsUnique();
        await this.saveDepartamento();
    }

    private makeEmpresaProspect(data: any): void {
        this.newDepartamento = (new DepartamentoBuilder(data)).build()
    }
    private validateDat(): void {
        if(!this.newDepartamento.nombre.trim()) throw new Error("Se requiere el nombre del Departamento");
        if(!this.newDepartamento.domicilio.trim()) throw new Error("Se requiere el domicilio del Departamento");
        if(!this.newDepartamento.rfc.trim()) throw new Error("Se requiere el rfc del Departamento");
        if(!this.newDepartamento.telefono.trim()) throw new Error("Se requiere el telefono del Departamento");
    }
    private async departamentoIsUnique() {
        const departamentoRegisterInDataBase = await this.dataLayer.findByName(this.newDepartamento.nombre);
        if(departamentoRegisterInDataBase.iddepartamento) throw new Error("El nombre "+this.newDepartamento.nombre+" ya está siendo utilizado");
    }
    private async saveDepartamento() {
        await this.dataLayer.save(this.newDepartamento);
    }
}