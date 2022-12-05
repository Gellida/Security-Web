import { Builder } from "../../domainProvider/Builder";
import { Empresa, EmpresaData } from "./empresaModel";

export class EmpresaBuilder extends Builder<Empresa, EmpresaData> {

    protected defautlParser(data: any): EmpresaData {
        return {
            idempresa: data?.idempresa,
            nombre: data?.nombre,
            razon: data?.razon,
            rfc: data?.rfc,
            curp: data?.curp,
            colonia: data?.colonia,
            estado: data?.estado,
            domicilio: data?.domicilio,
            telefono: data?.telefono,
            cp: data?.cp,
            municipio: data?.municipio,
            numint: data?.numint,
            numext: data?.numext,
            regimenfiscal: data?.regimenfiscal,
            email: data?.email,
            sitioweb: data?.sitioweb,
           
        };
    }
    protected makeEntity(data: EmpresaData): Empresa {
        return new Empresa(
            data.idempresa, 
            data.nombre, 
            data.razon,
            data.rfc,
            data.curp,
            data.colonia,
            data.estado,
            data.domicilio,
            data.telefono, 
            data.cp,
            data.municipio,
            data.numint,
            data.numext,
            data.regimenfiscal,
            data.email,
            data.sitioweb
        );
    }
    
}