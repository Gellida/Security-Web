import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { ServicioBuilder } from "../aplication/servicioBuilder";
import { Servicio, ServicioData } from "../domain/servicioModel";
import { ServicioRepository } from "../domain/servicioRepository";

export class MySqlServicioRepository implements ServicioRepository {
    async getAllActivesServicios(): Promise<Servicio[]> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_servicio WHERE idestatus = 1 ORDER BY modalidad ASC");
        const servicioes = (new ServicioBuilder(data)).buildList();
        return servicioes;
    }
    async findServicio(modalidad: string): Promise<Servicio> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_servicio WHERE nombre = '" + modalidad + "'");
        const servicio = (new ServicioBuilder(data[0], mySqlEmpleadoParser)).decorate(function (newServicio) {
            let servicio = newServicio;
            servicio.idestatus = data[0]?.idestatus;
            return servicio;
        }).build();
        return servicio;
    }
    async save(data: Servicio): Promise<void> {
        await MySqlDataBase.queryExecute("INSERT INTO tblc_servicio (modalidad, tiempo_servicio, cantidad_servicio, costo_servicio, cantidad_elementos, descripcion, idestatus) VALUES ( '" + data.modalidad + "', '" + data.tiempo_servicio + "', '" + data.cantidad_servicio + "', '" + data.costo_servicio + "', '" + data.cantidad_elementos + "','" + data.descripcion + "', '" + data.idestatus + "')");
    }
    async find(servicioId: string): Promise<Servicio> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_servicio WHERE servicioId = '" + servicioId + "'");
        const servicio = (new ServicioBuilder(data[0])).decorate(function (newServicio) {
            let servicio = newServicio;
            servicio.idestatus = data[0].idestatus;
            return servicio;
        }).build();
        return servicio;
    }
    update(newData: Servicio): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

function mySqlEmpleadoParser(data: any): ServicioData {
    return {
        servicioId: data?.servicioId,
        modalidad: data?.nombre,
        tiempo_servicio: data?.tiempo_servicio,
        cantidad_servicio: data?.cantidad_servicio,
        costo_servicio: data?.costo_servicio,
        cantidad_elementos: data?.cantidad_elementos,
        descripcion: data?.descripcion,    
        idestatus: data?.idestatus
    }
}