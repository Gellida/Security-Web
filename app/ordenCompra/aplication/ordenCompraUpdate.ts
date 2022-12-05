import { UseCase } from "../../domainProvider/UseCase";
import { OrdenCompra } from "../domain/ordenCompraModel";
import { OrdenCompraRepository } from "../domain/ordenCompraRepository";

export class ordenCompraUpdate implements UseCase {
    private repository: OrdenCompraRepository;
    private ordenCompraId: string;
    private newPrice: number;
    private ordenCompra: OrdenCompra

    constructor(respository: OrdenCompraRepository) {
        this.repository = respository;
    }
    async start(data: any): Promise<any> {
        this.ordenCompraId = data.OrdenCompraId;
        this.newPrice = data.newPrice;
        await this.getordenCompra();
        
    }

    protected async getordenCompra() {
        this.ordenCompra = await this.repository.find(this.ordenCompraId);
    }

}