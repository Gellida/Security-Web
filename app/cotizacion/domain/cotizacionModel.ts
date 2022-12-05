import { Cliente } from "../../cliente/domain/clienteModel";
import { SucursalCliente } from "../../cliente_sucursal/domain/cliente_sucursalModel";
import { dateFormat } from "../../infraestructureProvider/dateFormar";
import { Servicio } from "../../servicio/domain/servicioModel";

export class ServicioCounter {
    constructor(
        public cantidadDeServicios: number,
        public servicioId: string,
        public precioCotizado: number,
    ){}
}

export class Cotizacion {
    constructor(
        public cotizacionId: string,
        public clienteId: string,
        public sucursalId: string,
        public fechaRegistro: Date,
        public status: string,
        public serviciosIds: Array<ServicioCounter>,
    ) {}

    aprobar(): void {
        this.status = "6";
    }
    rechazar(): void {
        this.status = "5"
    }
    enviar(): void {
        this.status = "4";
    }
    capturar(): void {
        this.status = "3"
    }
    recotizar(): void {
        this.status = "7"
    }
    getStatusName(): string {
        if(this.status == "7") return "Histórico"
        if(this.status == "6") return "Aprobado";
        if(this.status == "5") return "No aprobado";
        if(this.status == "4") return "Enviado";
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
    constructor(servicio: Servicio, cantida: number, precio){
        const precioCotizado = precio ?? servicio.costo_servicio;
        super(cantida, servicio.servicioId,precioCotizado);
        this.servicio = servicio;
    }
    costoPorServicio(): number {
        if (this.precioCotizado) return Number.parseInt(this.precioCotizado.toString());
        return Number.parseInt(this.servicio.costo_servicio);
    }
    costoTotal(): number {
        return this.cantidadDeServicios * this.costoPorServicio()
    }
}

export class CotizacionDetails extends Cotizacion {
    serviciosIds: ServicioCounterDetails[];
    public cliente: Cliente;
    public sucursal: SucursalCliente;

    totalAcumulado(): string {
        return this.serviciosIds.reduce((acumulado, servicio)=>{
            return acumulado += servicio.costoTotal();
        },0).toLocaleString("en", {style: "currency", currency: "MXN"}).slice(2)
    }
    totalAcumulaWithoutMoneyMark(): number {
        return this.serviciosIds.reduce((acumulado, servicio)=>{
            return acumulado += servicio.costoTotal();
        },0)
    }
}