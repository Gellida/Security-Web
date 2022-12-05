import { Builder } from "../../domainProvider/Builder";
import { Servicio, ServicioData } from "../domain/servicioModel";

export class ServicioBuilder extends Builder<Servicio, ServicioData> {
    
    constructor(data: any, servicioParser?: (data: any) => ServicioData) {
        super(data, servicioParser);
        return this;
    }

    public servicioIsRequired(): this {
        const servicioId = this.dataEntity?.servicioId ?? this.originalData?.servicioId ?? "";
        if (servicioId === "" || isNaN(servicioId)) throw new Error("Servicio no encontrado");
        return this;
    }

    protected defautlParser(data: any): ServicioData {
        let servicio = {
            servicioId : data?.servicioid?.toString() ?? "",
            modalidad : data?.modalidad?.toString() ?? "",
            tiempo_servicio : data?.tiempo_servicio?.toString() ?? "",
            cantidad_servicio : data?.cantidad_servicio?.toString() ?? "",
            costo_servicio : data?.costo_servicio?.toString() ?? "",
            cantidad_elementos : data?.cantidad_elementos?.toString() ?? "",
            descripcion : data?.descripcion?.toString() ?? "",
            idestatus : data?.idestatus?.toString() ?? "",
            
        }
        return servicio;
    }
    protected makeEntity(data: ServicioData ): Servicio {
        return new Servicio(
            data.servicioId, 
            data.modalidad,
            data.tiempo_servicio,
            data.cantidad_servicio, 
            data.costo_servicio,
            data.cantidad_elementos,
            data.descripcion, 
            data.idestatus
        );
    }
}