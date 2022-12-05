import { dateFormat } from "../../infraestructureProvider/dateFormar";
import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { ServicioBuilder } from "../../servicio/aplication/servicioBuilder";
import { OrdenCompraFactory, OrdenCompraFactoryDetails } from "../domain/ordenCompraFactory";
import { OrdenCompra} from "../domain/ordenCompraModel";
import { OrdenCompraRepository } from "../domain/ordenCompraRepository";

export class OrdenCompraMySqlRepository implements OrdenCompraRepository {
    private factory: OrdenCompraFactory;
    constructor(){
        this.factory = new OrdenCompraFactory();
    }
    async save(data: OrdenCompra): Promise<void> {
        const response = await MySqlDataBase.queryExecute("INSERT INTO tblc_orden_compra (clienteid, sucursalid, fecha_captura, idstatus) VALUES (" + data.clienteId +", "+data.sucursalId+", '"+dateFormat(data.fechaRegistro)+"', "+data.status+")");
        const newordenCompraId = response.insertId;
        const query = "INSERT INTO tblc_orden_compra_servicio_referencia (orden_compraid, servicioid ,numero_servicios) VALUES " + data.serviciosIds.reduce((salida, servicio) => {
            return salida += "("+newordenCompraId+", "+servicio.servicioId+", "+servicio.cantidadDeServicios+"),"
        },"").slice(0,-1);
        await MySqlDataBase.queryExecute(query);
    }
    async find(id: string): Promise<OrdenCompra> {
        const factory = new OrdenCompraFactoryDetails();
        let [ordenCompra, listaServicios] = await Promise.all([
            MySqlDataBase.queryExecute("SELECT tblc_orden_compra.orden_compraid AS orden_compraId, tblc_orden_compra.clienteid AS clienteId, tblc_orden_compra.sucursalid AS sucursalId, tblc_orden_compra.fecha_captura AS fechaRegistro , tblc_orden_compra.idstatus AS status FROM tblc_orden_compra WHERE orden_compraid = "+ id),
            MySqlDataBase.queryExecute("SELECT tblc_servicio.servicioid, tblc_servicio.modalidad, tblc_servicio.tiempo_servicio, tblc_servicio.cantidad_servicio, tblc_servicio.costo_servicio, tblc_servicio.cantidad_elementos, tblc_servicio.descripcion, tblc_servicio.idestatus, tblc_orden_compra_servicio_referencia.orden_compraid, tblc_orden_compra_servicio_referencia.numero_servicios FROM tblc_servicio Inner Join tblc_orden_compra_servicio_referencia ON tblc_servicio.servicioid = tblc_orden_compra_servicio_referencia.servicioid WHERE tblc_orden_compra_servicio_referencia.orden_compraid =  "+ id)
        ]);
        listaServicios = listaServicios.map((servicio) => {
            return {
                servicio:(new ServicioBuilder(servicio)).build(),
                cantidadDeServicios: servicio.numero_servicios
            }
        })
        ordenCompra[0].serviciosIds = [...listaServicios];
        return !ordenCompra[0] ? factory.cleanMeake() : factory.make(ordenCompra[0]);
    }
    update(newData: OrdenCompra): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async all(): Promise<any> {
        const factory = new OrdenCompraFactoryDetails();
        let datas = await MySqlDataBase.queryExecute("SELECT tblc_orden_ompra.orden_compraid AS orden_compraId, tblc_orden_compra.clienteid AS clienteId, tblc_orden_compra.sucursalid AS sucursalId, tblc_orden_compra.fecha_captura AS fechaRegistro, tblc_orden_compra.idstatus AS status FROM tblc_orden_compra WHERE idstatus = 3");
        let listados =[];
        for(const data of datas) {
            const listadoServicios = await MySqlDataBase.queryExecute("SELECT tblc_servicio.servicioid, tblc_servicio.modalidad, tblc_servicio.tiempo_servicio, tblc_servicio.cantidad_servicio, tblc_servicio.costo_servicio, tblc_servicio.cantidad_elementos, tblc_servicio.descripcion, tblc_servicio.idestatus, tblc_orden_compra_servicio_referencia.orden_compraid, tblc_orden_compra_servicio_referencia.numero_servicios FROM tblc_servicio Inner Join tblc_orden_Compra_servicio_referencia ON tblc_servicio.servicioid = tblc_orden_compra_servicio_referencia.servicioid WHERE tblc_orden_compra_servicio_referencia.orden_compraid = "+data.ordenCompraId);
            listados.push(listadoServicios);
        }
        listados = listados.map((listadoServicios)=> {
            return listadoServicios.map((servicio)=> {
                return {
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