var CryptoJS = require("crypto-js");
require("dotenv").config();

export class EncryptionProvider {
  private encriptador;

  constructor(){
    this.encriptador = CryptoJS;
  }

  encrypt(text: string): string {
    return this.encriptador.SHA256(text).toString(CryptoJS.enc.Base64);
  }
}
