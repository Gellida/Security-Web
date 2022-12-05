import { UseCase } from "../../domainProvider/UseCase";
import { EmpleadoRepository } from "../domain/empleadoRepository";

export class EmpleadoDespido implements UseCase{
    private DataLayer: EmpleadoRepository;

    constructor(repository: EmpleadoRepository) {
        this.DataLayer = repository;
    }
    
    public async start(empleadoId: string) {
        await this.existEmpleado(empleadoId);
        await this.delEmpleado(empleadoId);
    }
    private async existEmpleado(id: string) {
        const empleado = await this.DataLayer.find(id);
        if (empleado.empleadoId.toString() != id) throw new Error("El empleado no existe");
        
    }
    private async delEmpleado(id: string) {
        await this.DataLayer.delete(id);
    }
}