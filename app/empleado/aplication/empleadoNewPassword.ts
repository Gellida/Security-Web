import { UseCase } from "../../domainProvider/UseCase";
import { EncryptionProvider } from "../../infraestructureProvider/encryptionProvider";
import { Empleado } from "../domain/empleadoModel";
import { EmpleadoRepository } from "../domain/empleadoRepository";

export class NewPassword implements UseCase {
    
    private DataLayer: EmpleadoRepository;
    private encrypter: EncryptionProvider;
    private password: string;
    private empleadoId: string;
    private empleado: Empleado;

    constructor(repository: EmpleadoRepository) {
        this.DataLayer = repository;
    }

    async start(data: any): Promise<any> {
        this.password = data.password;
        this.empleadoId = data.empleadoId;
        await this.getEmpleado();
        this.setNewPassword();
        await this.saveChanges();
    }
    private async getEmpleado() {
        this.empleado = await this.DataLayer.find(this.empleadoId);
    }
    private setNewPassword() {
        const newPass = this.encrypter.encrypt(this.password);
        this.empleado.passwordSet(newPass) ;
    }
    private async saveChanges() {
        await this.DataLayer.update(this.empleado);
    }
}