import { UseCase } from "../../domainProvider/UseCase";
import { SucursalClienteFactory } from "../domain/cliente_sucursalFactory";
import { SucursalCliente } from "../domain/cliente_sucursalModel";
import { SucursalClienteRepository } from "../domain/cliente_sucursalRepository";

export class SucursalClienteRegister implements UseCase {
    private repo: SucursalClienteRepository
    private newSucursal: SucursalCliente
    
    constructor(repo: SucursalClienteRepository) {
        this.repo = repo;
    }

    async start(data: any) {
        this.makeSucursal(data);
        this.existenciaCheck()
        this.guardar()
    }

    private makeSucursal(data) {
        try {
            this.newSucursal = SucursalClienteFactory.MakeSucursalCliente(data);
        } catch (error) {
            throw new Error("Datos inválidos de la sucursal");
        }
    }

    private async existenciaCheck() {
        const sucursales = await this.repo.findAllFromeSucursal(this.newSucursal.clienteId);
        sucursales.forEach((sucursal) => {
            if(sucursal.ubicacion == this.newSucursal.ubicacion && sucursal.name == this.newSucursal.name) throw new Error("La sucursal "+this.newSucursal.name+" ya existen en la bicación :"+this.newSucursal.ubicacion);
        })
    }

    private async guardar() {
        await this.repo.save(this.newSucursal);
    }
}