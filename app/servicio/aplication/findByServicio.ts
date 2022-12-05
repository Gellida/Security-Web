import { Servicio } from "../domain/servicioModel";
import { ServicioRepository } from "../domain/servicioRepository";

export class findByServicio {
  private DataLayer: ServicioRepository;
  private servicioId: string;
  private servicio: Servicio;

  constructor(repository: ServicioRepository) {
    this.DataLayer = repository;
  }

  async start(servicioId: string): Promise<Servicio> {
    this.servicioId = servicioId;
    await this.getServicio();
    return this.servicio;
  }


  private async getServicio(): Promise<void> {
    this.servicio = await this.DataLayer.findServicio(this.servicioId);
    if (!this.servicio.servicioId || this.servicio.servicioId === "") throw new Error("Servicio no encontrada");
  }

}
