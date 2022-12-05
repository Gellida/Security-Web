import {expect, test} from '@jest/globals';
import { ClienteRegister } from '../app/cliente/aplication/clienteRegister';
import { Cliente } from '../app/cliente/domain/clienteModel';
import { TestClienteRepository } from '../app/cliente/infrastructure/testClienteRepository';
import { EncryptionProvider } from '../app/infraestructureProvider/encryptionProvider';


describe("Cliente Register Module", ()=>{
    let casoDeUso = new ClienteRegister(new TestClienteRepository());
    test("user name empty", async () => {
        await expect(async () => {
            await casoDeUso.start("\n \t  ");
        }).rejects.toThrow("Usuario vacio");
    });
    test("user no exist", () => {
        expect(async () => {
            await casoDeUso.start("AEXA");
        }).rejects.toThrow("Cliente no encontrado");
    });
 
});