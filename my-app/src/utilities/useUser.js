import { useState }  from "react";
import {AES, enc} from 'crypto-js'

export default function useUser(){

    const getUser = () =>{
      if(sessionStorage.getItem('user')){
      const decrypted = AES.decrypt(sessionStorage.getItem('user'), 'secret-key1')
      const decrypteObject = decrypted.toString(enc.Utf8);
      return decrypteObject
      }
        return ""
      };
      
      const [user, setUser] = useState(getUser());
    const saveUser = user => {
    const encryptedObject = AES.encrypt(JSON.stringify(user), 'secret-key1' ).toString();
    sessionStorage.setItem('user', encryptedObject.toString());
    setUser(user)
     };
     
     return {
         setUser: saveUser,
         user
     }
}