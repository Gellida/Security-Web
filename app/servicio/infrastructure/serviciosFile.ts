import { PDF } from "../../infraestructureProvider/fileProvider";
import { Servicio } from "../domain/servicioModel";

export class ServicioPDF extends PDF {
    protected servicios: Map<string,Array<Servicio>>;// <string> es el nombre de la modalidad (Pido el catálogo agrupado y ordenado)
    
    setCatalogoServiciosGroupByModalida(servicios: Map<string,Array<Servicio>>) : this {
        this.servicios = servicios;
        return this;
    }

    layout(): this {
        this.setPdfBody([
            {text:'Estimado Usuario del Servicio:', margin:[0,50,0,0], fontSize: 18, bold: true},
            {text:'Por medio del presente me permito informarle los Costos del Servicio de Seguridad y Vigilancia en sus diferentes modalidades para el ejercicio '+(new Date()).getFullYear().toString(),  fontSize: 15, margin:[0,10,0,0]},
            {text: 'MODALIDAD DEL SERVICIO :', margin:[0,50,0,0], fontSize: 18, bold: true, decoration:"underline"},
            ...this.makeLayoutTablesList()
        ]);
        return this;
    }

    private makeLayoutTablesList(): Array<object> {
        let salida = [];
        this.servicios.forEach((servicios, key) => {
            salida.push(
                {text: key+' :', margin:[0,50,0,0], fontSize: 18, bold: true},
                {
                    margin:[0,10,0,0],
                    table: {
                        headerRows: 1,
                        widths: [ 50 , '*', 100 ],
                        body: [
                            [{text: "CANT", fillColor:"#ccc", alignment:"center", bold: true}, {text: "CONCEPTO", fillColor:"#ccc", alignment:"center", bold: true},{text: "COSTO POR MES IVA INCLUIDO", fillColor:"#ccc", alignment:"center", bold: true}],
                            ...servicios.map((servicio) => [{text:"1", alignment:"center"}, {text:servicio.descripcion}, {text:Number.parseInt(servicio.costo_servicio).toLocaleString("en", {style: "currency", currency: "MXN"}).slice(2), alignment:"center"}]),
                        ]
                    }
                }
            )
        });
        return salida;
    }
}