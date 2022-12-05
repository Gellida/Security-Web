import { Servicio, ServicioData } from "../domain/servicioModel";
import { ServicioRepository } from "../domain/servicioRepository";
import { ServicioBuilder } from "./servicioBuilder";

export class ServicioRegister {
  private DataLayer: ServicioRepository;
  private servicioData: ServicioData;
  private servicioToRegister: Servicio;

  constructor(repository: ServicioRepository) {
    this.DataLayer = repository;
  }

  async start(data: any) {
    this.makeServicio(data);
    this.validateData();
    this.registerNewServicio();
  }

  private makeServicio(data: any): void {
    
    this.servicioToRegister = (new ServicioBuilder(data)).decorate(function (servicio) {
     
      return servicio;
    }).build();
    
  }


  private validateData(): void {
    if (this.servicioToRegister.modalidad.trim() == "") throw new Error("Modalidad requerida");
    if (this.servicioToRegister.cantidad_elementos.trim() == "") throw new Error("Cantidad de elementos requeridos");
  }

  private async registerNewServicio() {
    await this.DataLayer.save(this.servicioToRegister);
  }
}
