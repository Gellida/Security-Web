export class Servicio {

  constructor(
    public servicioId: string,
    public modalidad: string,
    public tiempo_servicio: string,
    public cantidad_servicio: string,
    public costo_servicio: string,
    public cantidad_elementos: string,
    public descripcion: string,
    public idestatus: Int16Array
  ) { }


  static factory(data?: ServicioData): Servicio {
    if (data == null) throw new Error("Servicio no encontrado")
    return new Servicio(data.servicioId,data.modalidad,data.tiempo_servicio,data.cantidad_elementos,data.costo_servicio,data.cantidad_servicio,data.descripcion,data.idestatus);
  }

  static parserData(data?: any): ServicioData {
    try {
      let servicio = {
        servicioId: data.servicioId.toString() ?? "",
        modalidad: data.modalidad.toString() ?? "",
        tiempo_servicio: data.tiempo_servicio.toString() ?? "",
        cantidad_servicio: data.cantidad_servicio.toString() ?? "",
        costo_servicio: data.costo_servicio.toString() ?? "",
        cantidad_elementos: data.cantidad_elementos.toString() ?? "",
        descripcion: data.descripcion.toString() ?? "",
        idestatus: data.idestatus.toString() ?? "",
      }
      return servicio;
    } catch (error) {
      throw new Error("servicio Invalid input");
    }
  }

}
export type ServicioData = {
  servicioId: string,
  modalidad: string,
  tiempo_servicio: string,
  cantidad_servicio: string,
  costo_servicio: string,
  cantidad_elementos: string,
  descripcion: string,
  idestatus: Int16Array
};



