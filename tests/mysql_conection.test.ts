import {expect, test} from '@jest/globals';
import { MySqlDataBase } from '../app/infraestructureProvider/mySqlProvider';

describe("Correct connection to MySql", () => {
    test("Conecction whit credentials", async () => {
       await MySqlDataBase.testConnecction();
    })
});