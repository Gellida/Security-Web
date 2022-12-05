let fs = require('fs');

function PARSE_DATA(DATA) {
    var data = DATA.split("\n");
    data = data.map(element => element.trim());
    data = data.filter(element => element != "");
    data = data.map(element => element.split("=")[0].trim());
    return data;
}

function MAIN() {
    fs.readFile('bin/env.txt', 'utf-8', function (a, env) {
        fs.readFile('bin/example.txt', 'utf-8', function (b, example) {
            const ENV = PARSE_DATA(env);
            const EXAMPLE = PARSE_DATA(example);
            const ADDED = EXAMPLE.filter(element => !ENV.includes(element));
            const REMOVED = ENV.filter(element => !EXAMPLE.includes(element));
            if (ADDED.length == 0 && REMOVED.length == 0) console.log("Archivo .env actualizado");
            if (ADDED.length != 0) console.log("Campos agregados en <example.env> : ",ADDED);
            if (REMOVED.length != 0) console.log("Campos eliminados en <example.env> : ",REMOVED);
        });
    });
}

MAIN()