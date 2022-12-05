const mysql = require('mysql');
require("dotenv").config();

export class MySqlDataBase {

    static async testConnecction() {
        const consult = await MySqlDataBase.queryExecute("SELECT * FROM tblc_permiso");
    }

    static async queryExecute(query: string): Promise<any> {
        let connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.PASSWORD || '',
            database: process.env.DATA_BASE
        });
        await connection.connect();
        return new Promise(async (resolve, rejects)=>{
            await connection.query(query, function(error, filas){
                if(error) rejects(error)
                else resolve(filas);
            });
            await connection.end();
        });
    }
}