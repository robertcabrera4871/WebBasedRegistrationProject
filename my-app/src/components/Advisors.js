import { useEffect, useState } from "react";
import dbUtil from "../utilities/dbUtil";
import {AES, enc} from 'crypto-js'
import React from "react";

export default function Advisors(){

    const[myAdvisors, setMyAdvisors] = useState([]);
    

    useEffect(() => {
        getAdvisors();
    }, [])


    var user = ""
     if(sessionStorage.getItem('user')){
    const decrypted = AES.decrypt(sessionStorage.getItem('user'), 'secret-key1')
     user = decrypted.toString(enc.Utf8);
     user = JSON.parse(user)
    }


    function getAdvisors(){
        dbUtil.getMyAdvisors(user.userID).then(
            data =>{
                setMyAdvisors(data)
            }
        )
    }
    return(
    <div>{myAdvisors.firstName}</div>
    );
}