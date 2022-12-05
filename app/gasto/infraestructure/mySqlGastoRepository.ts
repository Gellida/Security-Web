import { MySqlDataBase } from "../../infraestructureProvider/mySqlProvider";
import { GastoBuilder } from "../domain/gastoBuilder";
import { Gasto } from "../domain/gastoModel";
import { GastoRepository } from "../domain/gastoRepository";

export class MySqlGastoRepository implements GastoRepository {
    async findAll(): Promise<Gasto[]> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_gasto");
        const misgastos = (new GastoBuilder(data)).buildList();
        return misgastos;
    }

    async findByConcepto(concepto: string): Promise<Gasto> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_gasto WHERE concepto = '"+concepto+"'");
        const gasto = (new GastoBuilder(data)).build();
        return gasto;
    }
    async save(data: Gasto): Promise<void> {
        await MySqlDataBase.queryExecute("INSERT INTO tblc_gasto (gastoid,concepto,monto,feccap,persona_captura) VALUES ('"+data.gastoid+"','"+data.concepto+"','"+data.monto+"','"+data.feccap+"','"+data.persona_captura+"')");
    }
    async find(id: string): Promise<Gasto> {
        const data = await MySqlDataBase.queryExecute("SELECT * FROM tblc_gasto WHERE gastoid = "+id+"'")[0];
        const gasto = (new GastoBuilder(data)).build();
        return gasto;
    }
    update(newData: Gasto): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}