import { UseCaseCeate } from "../../domainProvider/UseCase";
import { OrdenCompraFactory } from "../domain/ordenCompraFactory";
import { OrdenCompra } from "../domain/ordenCompraModel";
import { OrdenCompraRepository } from "../domain/ordenCompraRepository";
import { SucursalClienteRepository } from "../../cliente_sucursal/domain/cliente_sucursalRepository";
import { ClienteRepository } from "../../cliente/domain/clienteRepository";
import { ServicioRepository } from "../../servicio/domain/servicioRepository";
import { Cliente } from "../../cliente/domain/clienteModel";
import { SucursalCliente } from "../../cliente_sucursal/domain/cliente_sucursalModel";
import { Servicio } from "../../servicio/domain/servicioModel";

export class OrdenCompraRegister extends UseCaseCeate<OrdenCompra> {
    protected sucursalRepo: SucursalClienteRepository;
    protected clienteRepo: ClienteRepository;
    protected serviciosRepo: ServicioRepository;

    constructor(repository: OrdenCompraRepository, sucursalRepo: SucursalClienteRepository, clienteRepo: ClienteRepository, serviciosRepo: ServicioRepository) {
        super();
        this.mainRepository = repository;
        this.clienteRepo = clienteRepo;
        this.sucursalRepo = sucursalRepo;
        this.serviciosRepo = serviciosRepo;
        this.factory = new OrdenCompraFactory();
    }

    protected dataValidation(): void {
        if(this.isIdInvalid(this.data.clienteId)) throw new Error("Es necesario un cliente");
        if(this.isIdInvalid(this.data.sucursalId)) throw new Error("Es necesario una sucursal");
        if(!this.data.serviciosIds || (this.data.serviciosIds.length ?? 0) == 0) throw new Error("Es necesario agregar al menos un servicio");
        this.data.serviciosIds.forEach((servicioCounter) => {
            if(this.isIdInvalid(servicioCounter.servicioId) || this.isIdInvalid(servicioCounter.cantidadDeServicios)) throw new Error("Formato de servicio inválido");
        });
    }

    protected async asyncDataValidation(): Promise<void> {
        let [cliente, sucursal, servicios] = await Promise.all([
            this.clienteRepo.find(this.data.clienteId), 
            this.sucursalRepo.find(this.data.sucursalId), 
            this.serviciosRepo.getAllActivesServicios()
        ]);
        this.clienteValidate(cliente, sucursal);
        this.serviciosValidate(servicios);
    }
    
    protected clienteValidate(cliente: Cliente, sucursal: SucursalCliente): void {
        if(cliente.clienteId === "") throw new Error("El cliente no está registrado");
        if(sucursal.sucursalId === "") throw new Error("La sucursal no se encuentra registrada");
        if(sucursal.clienteId != cliente.clienteId) throw new Error("La sucursal no corresponde con el cliente");
    }

    protected serviciosValidate(servicios: Servicio[]) {
        const serviciosSelected = [...this.data.serviciosIds];
        serviciosSelected.forEach((servicio) => {
            const servicioIsActiv = servicios.reduce((bandera, servicioActivo)=> bandera ||= servicioActivo.servicioId == servicio.servicioId, false)
            if(!servicioIsActiv) throw new Error("Existen servicios inválidos en la cotización");  
        })
    }

    protected setObjet(): void {
        this.objToCreate.clienteId = this.data.clienteId;
        this.objToCreate.sucursalId = this.data.sucursalId;
        this.objToCreate.serviciosIds = this.data.serviciosIds;
        this.objToCreate.iniciar();
    }

    protected isIdInvalid(Id): Boolean {
        return !Id || isNaN(Id);
    }

}