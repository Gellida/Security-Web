import { Cliente } from "../../cliente/domain/clienteModel";
import { SucursalCliente } from "../../cliente_sucursal/domain/cliente_sucursalModel";
import { dateFormat } from "../../infraestructureProvider/dateFormar";
import { Servicio } from "../../servicio/domain/servicioModel";

export class ServicioCounter {
    constructor(
        public cantidadDeServicios: number,
        public servicioId: string
    ){}
}

export class OrdenCompra {
    constructor(
        public cotizacionId: string,
        public clienteId: string,
        public sucursalId: string,
        public fechaRegistro: Date,
        public status: string,
        public serviciosIds: Array<ServicioCounter>,
        public precioOpcional: number,
    ) {}

    iniciar(): void {
        this.status = "7";
    }
    Cancelar(): void {
        this.status = "8"
    }
    
    getStatusName(): string {
        if(this.status == "7") return "Iniciado";
        if(this.status == "8") return "Cancelado";
        return "En captura"
    }
    getFolio(): string {
        let format = "" + this.cotizacionId;
        if(Number.parseInt(this.cotizacionId) < 10) format = "0" +format;
        if(Number.parseInt(this.cotizacionId) < 100) format = "0" +format;
        if(Number.parseInt(this.cotizacionId) < 1000) format = "0" +format;
        if(Number.parseInt(this.cotizacionId) < 10000) format = "0" +format;
        return "F"+ format;
    }
    getFechaFormat(): string {
        return dateFormat(this.fechaRegistro)
    }
}

export class ServicioCounterDetails extends ServicioCounter {
    public servicio: Servicio;
    constructor(servicio: Servicio, cantida: number){
        super(cantida, servicio.servicioId);
        this.servicio = servicio;
    }
    costoTotal(): number {
        return this.cantidadDeServicios * Number.parseInt(this.servicio.costo_servicio);
    }
}

export class OrdenCompraDetails extends OrdenCompra {
    serviciosIds: ServicioCounterDetails[];
    public cliente: Cliente;
    public sucursal: SucursalCliente;

    totalAcumulado(): number {
        if(this.precioOpcional > 0) return this.precioOpcional;
        return this.serviciosIds.reduce((acumulado, servicio)=>{
            return acumulado += servicio.costoTotal();
        },0);
    }
}