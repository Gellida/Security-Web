import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { ServicioBuilder } from "../../servicio/aplication/servicioBuilder";
import { CotizacionFactory, CotizacionFactoryDetails } from "../domain/cotizacionFactory";
import { Cotizacion, CotizacionDetails } from "../domain/cotizacionModel";
import { CotizacionRepository, CotizacionToOrdenCompraRepository } from "../domain/cotizacionRepository";

export class CotizacionMySqlRepository implements CotizacionRepository {
    private factory: CotizacionFactory;
    constructor(){
        this.factory = new CotizacionFactory();
    }
    async findDitels(cotizacionId: string): Promise<CotizacionDetails> {
        const factory = new CotizacionFactoryDetails();
        let [cotizacion, listaServicios] = await Promise.all([
            MySqlDataBase.queryExecute("SELECT tblc_cotizacion.cotizacionid AS cotizacionId, tblc_cotizacion.clienteid AS clienteId, tblc_cotizacion.sucursalid AS sucursalId, tblc_cotizacion.fecha_captura AS fechaRegistro , tblc_cotizacion.idstatus AS status FROM tblc_cotizacion WHERE cotizacionid = "+ cotizacionId),
            MySqlDataBase.queryExecute("SELECT tblc_servicio.servicioid, tblc_servicio.modalidad, tblc_servicio.tiempo_servicio, tblc_servicio.cantidad_servicio, tblc_servicio.costo_servicio, tblc_servicio.cantidad_elementos, tblc_servicio.descripcion, tblc_servicio.idestatus, tblc_cotizacion_servicio_referencia.cotizacionid, tblc_cotizacion_servicio_referencia.numero_servicios, tblc_cotizacion_servicio_referencia.precio_cotizado AS precioCotizado FROM tblc_servicio Inner Join tblc_cotizacion_servicio_referencia ON tblc_servicio.servicioid = tblc_cotizacion_servicio_referencia.servicioid WHERE tblc_cotizacion_servicio_referencia.cotizacionid =  "+ cotizacionId + " ORDER BY modalidad ASC")
        ]);
        listaServicios = listaServicios.map((servicio) => {
            return {
                servicio:(new ServicioBuilder(servicio)).build(),
                cantidadDeServicios: servicio.numero_servicios,
                precioCotizado: servicio.precioCotizado
            }
        })
        cotizacion[0].serviciosIds = [...listaServicios];
        return !cotizacion[0] ? factory.cleanMeake() : factory.make(cotizacion[0]);
    }
    async save(data: Cotizacion, inside?: (cotizacionId: number) => Promise<void>): Promise<void> {
        const response = await MySqlDataBase.queryExecute("INSERT INTO tblc_cotizacion (clienteid, sucursalid, fecha_captura, idstatus) VALUES (" + data.clienteId +", "+data.sucursalId+", '"+data.fechaRegistro.toISOString().slice(0, 19).replace('T', ' ')+"', "+data.status+")");
        const newCotizacionId = response.insertId;
        const query = "INSERT INTO tblc_cotizacion_servicio_referencia (cotizacionid, servicioid ,numero_servicios, precio_cotizado) VALUES " + data.serviciosIds.reduce((salida, servicio) => {
            return salida += "("+newCotizacionId+", "+servicio.servicioId+", "+servicio.cantidadDeServicios+", "+ (servicio?.precioCotizado ?? 0) +"),"
        },"").slice(0,-1);
        await MySqlDataBase.queryExecute(query);
        if(inside) await inside(response.insertId);
    }
    async find(id: string): Promise<Cotizacion> {
        const factory = new CotizacionFactoryDetails();
        let [cotizacion, listaServicios] = await Promise.all([
            MySqlDataBase.queryExecute("SELECT tblc_cotizacion.cotizacionid AS cotizacionId, tblc_cotizacion.clienteid AS clienteId, tblc_cotizacion.sucursalid AS sucursalId, tblc_cotizacion.fecha_captura AS fechaRegistro , tblc_cotizacion.idstatus AS status FROM tblc_cotizacion WHERE cotizacionid = "+ id),
            MySqlDataBase.queryExecute("SELECT tblc_servicio.servicioid, tblc_servicio.modalidad, tblc_servicio.tiempo_servicio, tblc_servicio.cantidad_servicio, tblc_servicio.costo_servicio, tblc_servicio.cantidad_elementos, tblc_servicio.descripcion, tblc_servicio.idestatus, tblc_cotizacion_servicio_referencia.cotizacionid, tblc_cotizacion_servicio_referencia.numero_servicios, tblc_cotizacion_servicio_referencia.precio_cotizado AS precioCotizado FROM tblc_servicio Inner Join tblc_cotizacion_servicio_referencia ON tblc_servicio.servicioid = tblc_cotizacion_servicio_referencia.servicioid WHERE tblc_cotizacion_servicio_referencia.cotizacionid =  "+ id + " ORDER BY modalidad ASC")
        ]);
        listaServicios = listaServicios.map((servicio) => {
            return {
                servicio:(new ServicioBuilder(servicio)).build(),
                cantidadDeServicios: servicio.numero_servicios,
                precioCotizado: servicio.precioCotizado
            }
        })
        cotizacion[0].serviciosIds = [...listaServicios];
        return !cotizacion[0] ? factory.cleanMeake() : factory.make(cotizacion[0]);
    }
    async update(newData: Cotizacion): Promise<void> {
        await this.save(newData, async (newId)=> {
            await Promise.all([
                MySqlDataBase.queryExecute("INSERT INTO tblc_cotizacion_historico (cotizacionpadreid, cotizacionhijoid) VALUES ("+newData.cotizacionId+","+newId+")"),
                MySqlDataBase.queryExecute("UPDATE tblc_cotizacion SET idstatus = 7 WHERE cotizacionid = "+newData.cotizacionId)
            ]);
        });
    }
    async delete(id: string): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_cotizacion SET idstatus = 5 WHERE cotizacionid = "+id)
    }
    async all(): Promise<any> {
        const factory = new CotizacionFactoryDetails();
        let datas = await MySqlDataBase.queryExecute("SELECT tblc_cotizacion.cotizacionid AS cotizacionId, tblc_cotizacion.clienteid AS clienteId, tblc_cotizacion.sucursalid AS sucursalId, tblc_cotizacion.fecha_captura AS fechaRegistro, tblc_cotizacion.idstatus AS status FROM tblc_cotizacion WHERE idstatus = 3");
        let listados =[];
        for(const data of datas) {
            const listadoServicios = await MySqlDataBase.queryExecute("SELECT tblc_servicio.servicioid, tblc_servicio.modalidad, tblc_servicio.tiempo_servicio, tblc_servicio.cantidad_servicio, tblc_servicio.costo_servicio, tblc_servicio.cantidad_elementos, tblc_servicio.descripcion, tblc_servicio.idestatus, tblc_cotizacion_servicio_referencia.cotizacionid, tblc_cotizacion_servicio_referencia.numero_servicios, tblc_cotizacion_servicio_referencia.precio_cotizado AS precioCotizado  FROM tblc_servicio Inner Join tblc_cotizacion_servicio_referencia ON tblc_servicio.servicioid = tblc_cotizacion_servicio_referencia.servicioid WHERE tblc_cotizacion_servicio_referencia.cotizacionid = "+data.cotizacionId+" ORDER BY modalidad ASC");
            listados.push(listadoServicios);
        }
        listados = listados.map((listadoServicios)=> {
            return listadoServicios.map((servicio)=> {
                return {
                    precioCotizado: servicio.precioCotizado,
                    cantidadDeServicios: servicio.numero_servicios,
                    servicio: (new ServicioBuilder(servicio)).build()
                }
            });
        })
        for (let index = 0; index < datas.length; index++) {
            datas[index].serviciosIds = listados[index];
        }
        datas = factory.makeList(datas);
        return datas
    }
}

export class CotizacionToOrdenCompraMySqlRepository implements CotizacionToOrdenCompraRepository {
    async getAceptedCotizacion(): Promise<Cotizacion[]> {
        const factory = new CotizacionFactoryDetails();
        let datas = await MySqlDataBase.queryExecute("SELECT tblc_cotizacion.cotizacionid AS cotizacionId, tblc_cotizacion.clienteid AS clienteId, tblc_cotizacion.sucursalid AS sucursalId, tblc_cotizacion.fecha_captura AS fechaRegistro, tblc_cotizacion.idstatus AS status FROM tblc_cotizacion WHERE idstatus = 6");
        let listados =[];
        for(const data of datas) {
            const listadoServicios = await MySqlDataBase.queryExecute("SELECT tblc_servicio.servicioid, tblc_servicio.modalidad, tblc_servicio.tiempo_servicio, tblc_servicio.cantidad_servicio, tblc_servicio.costo_servicio, tblc_servicio.cantidad_elementos, tblc_servicio.descripcion, tblc_servicio.idestatus, tblc_cotizacion_servicio_referencia.cotizacionid, tblc_cotizacion_servicio_referencia.numero_servicios, tblc_cotizacion_servicio_referencia.precio_cotizado AS precioCotizado  FROM tblc_servicio Inner Join tblc_cotizacion_servicio_referencia ON tblc_servicio.servicioid = tblc_cotizacion_servicio_referencia.servicioid WHERE tblc_cotizacion_servicio_referencia.cotizacionid = "+data.cotizacionId+" ORDER BY modalidad ASC");
            listados.push(listadoServicios);
        }
        listados = listados.map((listadoServicios)=> {
            return listadoServicios.map((servicio)=> {
                return {
                    precioCotizado: servicio.precioCotizado,
                    cantidadDeServicios: servicio.numero_servicios,
                    servicio: (new ServicioBuilder(servicio)).build()
                }
            });
        })
        for (let index = 0; index < datas.length; index++) {
            datas[index].serviciosIds = listados[index];
        }
        datas = factory.makeList(datas);
        return datas
    }
    async cotizacionUpdate(cotizacionId: string): Promise<void> {
        await MySqlDataBase.queryExecute("UPDATE tblc_cotizacion SET idstatus = 6 WHERE cotizacionid = "+cotizacionId);
    }
}