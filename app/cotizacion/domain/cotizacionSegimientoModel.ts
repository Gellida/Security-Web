import { CotizacionDetails } from "./cotizacionModel";

export class CotizacionSegimiento extends CotizacionDetails {
    seguimientos: Array<Seguimiento>;

    totalUnidadesRequires(): number {
        return this.serviciosIds.reduce((acumulado, servicio) => {
            return acumulado += Number.parseInt(servicio.servicio.cantidad_elementos);
        }, 0);
    }

    isValid(): boolean {
        return this.seguimientos.reduce((salida, Seguimiento) => {
            return salida &&= Seguimiento.isValid();
        }, true);
    }
}

export class Seguimiento {
    constructor(
        public seguimientoId: string,
        public cotizacionId: string,
        public empleadoId: string,
        public status: string,
        public departamentoId: string,
        public feccap: Date,
    ){}
    
    valid() {
        this.status = "Validado";
    }

    isValid() {
        return this.status == "Validado";
    }
}