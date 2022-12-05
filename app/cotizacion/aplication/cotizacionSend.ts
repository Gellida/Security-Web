import { ClienteRepository } from "../../cliente/domain/clienteRepository";
import { SucursalClienteRepository } from "../../cliente_sucursal/domain/cliente_sucursalRepository";
import { UseCase } from "../../domainProvider/UseCase";
import { CotizacionDetails } from "../domain/cotizacionModel";
import { CotizacionRepository } from "../domain/cotizacionRepository";
import { CotizacionPDF } from "../infraestructure/cotizacionFiles";

export class CotizacionSend implements UseCase {
    protected cotizacionToSend: CotizacionDetails;
    protected cotizacionRepo: CotizacionRepository;
    protected clienteRepo: ClienteRepository;
    protected sucursalRepo: SucursalClienteRepository;
    protected pdf: CotizacionPDF;

    constructor(cotizacionRepo: CotizacionRepository,clienteRepo: ClienteRepository,sucursalRepo: SucursalClienteRepository, pdf: CotizacionPDF) {
        this.cotizacionRepo = cotizacionRepo;
        this.clienteRepo = clienteRepo;
        this.sucursalRepo = sucursalRepo;
        this.pdf = pdf;
    }

    async start(data: any): Promise<any> {
        await this.searchCotizacion(data);
        await this.searchClienteData();
        return this.pdf.setCotizacion(this.cotizacionToSend).layout()
    }

    protected async searchCotizacion(data: string) {
        this.cotizacionToSend = await this.cotizacionRepo.findDitels(data);
    }

    protected async searchClienteData() {
        const [cliente, sucursal] = await Promise.all([
            this.clienteRepo.find(this.cotizacionToSend.clienteId),
            this.sucursalRepo.find(this.cotizacionToSend.sucursalId)
        ]);
        this.cotizacionToSend.cliente = cliente;
        this.cotizacionToSend.sucursal = sucursal;
    }
}