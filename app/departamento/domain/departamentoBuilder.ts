import { Builder } from "../../domainProvider/Builder";
import { Departamento, DepartamentoData } from "./departamentoModel";

export class DepartamentoBuilder extends Builder<Departamento, DepartamentoData> {

    protected defautlParser(data: any): DepartamentoData {
        return {
            iddepartamento: data?.iddepartamento ?? "",
            nombre: data?.nombre ?? "",
            rfc: data?.rfc ?? "",
            telefono: data?.telefono ?? "",
            domicilio: data?.domicilio ?? "",
        };
    }
    protected makeEntity(data: DepartamentoData): Departamento {
        return new Departamento(
            data.iddepartamento, 
            data.nombre, 
            data.rfc, 
            data.telefono, 
            data.domicilio
        );
    }
    
}