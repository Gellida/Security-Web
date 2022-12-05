import { Builder } from "../../domainProvider/Builder";
import { Gasto, GastoData } from "./gastoModel";

export class GastoBuilder extends Builder<Gasto, GastoData> {

    protected defautlParser(data: any): GastoData {
        return {
            gastoid: data?.gastoid ?? "",
            concepto: data?.concepto ?? "",
            monto: data?.monto ?? "",
            feccap: data?.feccap ?? "",
            persona_captura: data?.persona_captura ?? "",
        };
    }
    protected makeEntity(data: GastoData): Gasto {
        return new Gasto(
            data.gastoid, 
            data.concepto,
            data.monto,
            data.feccap,
            data.persona_captura
        );
    }
    
}