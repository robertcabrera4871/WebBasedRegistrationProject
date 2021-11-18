import { useState }  from "react";

export default function useUser(){
    const getUser = () =>{
        const userInStorage = sessionStorage.getItem('user');
        const userString = JSON.parse(userInStorage);
        return userString
      };
      
      const [user, setUser] = useState(getUser());
    

    const saveUser = user => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user)
     };
     
     return {
         setUser: saveUser,
         user
     }
}