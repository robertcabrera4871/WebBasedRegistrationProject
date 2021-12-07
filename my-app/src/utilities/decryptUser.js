import {AES, enc} from 'crypto-js'

export default function decryptUser(){
    var user = ""
    if(sessionStorage.getItem('user')){
   const decrypted = AES.decrypt(sessionStorage.getItem('user'), 'secret-key1')
    user = decrypted.toString(enc.Utf8);
    user = JSON.parse(user)
    }
    return user
}