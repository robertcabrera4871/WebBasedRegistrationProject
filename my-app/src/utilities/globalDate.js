import {AES, enc} from 'crypto-js'

export default class globalDate {

   static setGlobalDate(date){
        const encryptedObject = AES.encrypt(JSON.stringify({date}), 'nO ToUcHy My DatE' ).toString();
        sessionStorage.setItem("globalDate", encryptedObject.toString());
   }

    static getGlobalDate(){
        const decrypted = AES.decrypt(sessionStorage.getItem('globalDate'), 'nO ToUcHy My DatE')
        const decrypteObject = decrypted.toString(enc.Utf8);
        const date = (JSON.parse(decrypteObject).date) 
       return (date)
    }
}