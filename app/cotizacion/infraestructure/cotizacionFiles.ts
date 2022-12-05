import { PDF } from "../../infraestructureProvider/fileProvider";
import { CotizacionDetails } from "../domain/cotizacionModel";

export class CotizacionPDF extends PDF {
    protected cotizacion: CotizacionDetails;

    setCotizacion(cotizacion: CotizacionDetails): this {
        this.cotizacion = cotizacion;
        return this;
    }

    layout(): this {
        this.setPdfBody([
            {text:'División de Seguridad Física', margin:[0,50,0,0], fontSize: 15, bold: true},
            {text: this.cotizacion.getFolio(), fontSize:15},
            {text : "S3 Tuxtla", fontSize: 18, bold: true, alignment:"right", margin:[0,-35,0,40]}, 
            {text: [
                {text: this.cotizacion.fechaRegistro.toLocaleDateString("es",{weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'}), fontSize: 10}
            ], alignment:"right", margin:[0,-35,0,40]},
            {text: this.cotizacion.cliente.name, fontSize: 20},
            {text: "PRESENTE", fontSize:15},
            {text: "Por medio de la presente me permito presentar la Cotización solicitada de nuestro servicio de Seguridad Privada y Vigilancia.", margin:[0,20,0,0],  fontSize:12},
            {
                margin:[0,50,0,0],
                table: {
                    headerRows: 1,
                    widths: [ 75 , '*', 100, 100 ],
                    body: [
                        [{text: "Cantidad de servicios", fillColor:"#ccc", alignment:"center"}, {text: "Descripción", fillColor:"#ccc", alignment:"center"},{text: "Costo del servicio", fillColor:"#ccc", alignment:"center"},{text: "Costo mensual", fillColor:"#ccc", alignment:"center"}],
                        ...this.cotizacion.serviciosIds.map(servicio => {
                            return [{text: servicio.cantidadDeServicios, alignment:"center", margin:[0,5]},{text: servicio.servicio.descripcion, alignment:"center"},{text: servicio.costoPorServicio().toLocaleString('en', {style: 'currency', currency: 'MXN'}).slice(2) , alignment:"center", margin:[0,5]},{text: servicio.costoTotal().toLocaleString('en', {style: 'currency', currency: 'MXN'}).slice(2) , alignment:"center", margin:[0,5]}]
                        }),
                    ]
                }
            },
            {
                table: {
                    widths: [  '*', 100 ],
                    body: [
                        [{text: "SUBTOTAL", alignment:"right"},{text: (this.cotizacion.totalAcumulaWithoutMoneyMark()*0.16 - this.cotizacion.totalAcumulaWithoutMoneyMark()).toLocaleString('en', {style: 'currency', currency: 'MXN'}).slice(3), alignment:"center"}],
                        [{text: "IVA", alignment:"right"},{text:(this.cotizacion.totalAcumulaWithoutMoneyMark()*0.16).toLocaleString('en', {style: 'currency', currency: 'MXN'}).slice(2), alignment:"center"}],
                        [{text: "TOTAL POR MES CON IVA INCLUIDO", alignment:"right"},{text: this.cotizacion.totalAcumulado(), alignment:"center"}],
                    ]
                }
            },
            {margin:[0,20,0,0], fontSize: 12 ,text:"Le reitero mis servicios y mi disponibilidad con usted, cualquier duda o aclaración estoy a sus órdenes."},
            {margin:[0,100,0,0], fontSize: 15, text: "ATENTAMENTE", alignment:"center"},
		    {margin:[0,50,0,0], fontSize: 15, text: "REPRESANTANTE LEGAL", alignment:"center", bold: true}
        ]);
        return this;
    } 
}