import {expect, test} from '@jest/globals';
import { EmpleadoLogin } from '../app/empleado/aplication/empleadoLogin';
import { Empleado } from '../app/empleado/domain/empleadoModel';
import { TestEmpleadoRepository } from '../app/empleado/infrastructure/testEmpleadoRepository';
import { EncryptionProvider } from '../app/infraestructureProvider/encryptionProvider';

describe("Empleado login Module", ()=>{
    let casoDeUso = new EmpleadoLogin(new TestEmpleadoRepository(), new EncryptionProvider());
    test("user name empty", async () => {
        await expect(async () => {
            await casoDeUso.start("\n \t  ","");
        }).rejects.toThrow("Usuario vacio");
    });
    test("password is empty", () => {
        expect(async () => {
            await casoDeUso.start("fran","    ");
        }).rejects.toThrow("Contraseña Vacia")
    });
    test("user no exist", () => {
        expect(async () => {
            await casoDeUso.start("franc","password");
        }).rejects.toThrow("Empleado no encontrado");
    });
    test("bad password", async() => {
        await expect(async () => {
            await casoDeUso.start("fran","passwordddd");
        }).rejects.toThrow("Contraseña incorrecta");
    });
    test("user login", async () => {
        await expect(casoDeUso.start("fran","password"))
        .resolves
        .toStrictEqual(expect.any(Empleado));
    });
});