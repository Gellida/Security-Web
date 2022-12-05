import { Empresa } from "../empresa/domain/empresaModel";
import { MySqlEmpresaRepository } from "../empresa/infraestructure/mySqlEmpresaRepository";

var PdfPrinter = require('pdfmake');
var path = require('path');

export class PDF {
    document: any;
    body: Object;
    empresa: Empresa;
    constructor(){
        var fontDescriptors = {
            Roboto: {
                normal: path.join(__dirname, '..','..', 'public', '/fonts/Roboto-Regular.ttf'),
			    bold: path.join(__dirname, '..','..', 'public', '/fonts/Roboto-Medium.ttf'),
			    italics: path.join(__dirname, '..','..', 'public', '/fonts/Roboto-Italic.ttf'),
			    bolditalics: path.join(__dirname, '..','..', 'public', '/fonts/Roboto-MediumItalic.ttf')
            }
        };
        this.document = new PdfPrinter(fontDescriptors);
    }
    setEmpresa(empresa: Empresa){
        this.empresa = empresa;
    }
    setPdfBody(body: object) {
        this.body = {
            header: {
                columns: [
                    {
                        image : path.join(__dirname, '..','..', 'public', '/images/fondoLogin.png'),
                        width: 50,
                        height: 50,
                        alignment: 'left',
                        margin: [10, 10, 10, 0]
                    },
                    { 
                        text: [
                            '¡Personas y Tecnología ',
                            {text: "al servicio de su Seguridad!", color:"#ffffff", bold:true}
                        ], 
                        margin: [26, 16, 10, 0],
                        fontSize: 20,
                    },
                    
                ],
            },
            content: body,
            background: (currentPage, pageSize) => { // Header and footer Barras amarillas 
                return [
                    {
                        text: "..",
                        fontSize:"60",
                        color: "#F29F05",
                        background: "#F29F05",
                        characterSpacing: 563
                    },
                    !this.empresa ? {} : {
                        margin:[0,pageSize.height - 122,0,0],
                        text: "..",
                        fontSize:"44",
                        color: "#F29F05",
                        background: "#F29F05",
                        characterSpacing: 572
                    }
                ];
            },
            footer: ()=>{
                console.log(this.empresa);
                
                if(!this.empresa) return {};
                else return {
                    columns: [
                        {
                            alignment:'left',
                            margin:[5,0,0,0],
                            ul: [
                                { text: this.empresa.domicilio + " #" + this.empresa.numext , fontSize: 8},
                                { text: "CP. "+ this.empresa.cp , alignment:'left', fontSize: 8},
                                { text: this.empresa.municipio , alignment:'left', fontSize: 8},
                                { text: this.empresa.telefono , alignment:'left', fontSize: 8},
                            ]
                        },
                        {
                            image : path.join(__dirname, '..','..', 'public', '/images/fondoLogin.png'),
                            width: 30,
                            height: 30,
                            alignment: 'right',
                            margin:[0,0,10,0]
                        },
                    ]
                }
            },
        };
    }
    send(res) {
        try {
            let pdfDoc = this.document.createPdfKitDocument(this.body, null);
            var chunks = [];
            pdfDoc.on("data", (chunk) => {
                chunks.push(chunk);
            })
            pdfDoc.on("end", () => {
                const data = Buffer.concat(chunks);
                res.contentType('application/pdf');
                res.send(data);
            });
            pdfDoc.end()
        } catch (error) {
            console.log(error);
        }
    }
}