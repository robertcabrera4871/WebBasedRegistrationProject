import dbUtil from "../utilities/dbUtil";
import { useEffect, useState } from "react";
import React from 'react';
import {AES, enc} from 'crypto-js'
import MinorsTable from "./tableComponents/MinorsTable";
import MajorsTable from "./tableComponents/MajorsTable";
import StudentMajors from "./tableComponents/StudentMajors";
import StudentMinors from "./tableComponents/StudentMinors";

export default function AddMajorMinor(){

    const [majors, setMajors] = useState([]);
    const [minors, setMinors] = useState([]);
    const [myMajors, setMyMajors] = useState([]);
    const [myMinors, setMyMinors] = useState([]);


    useEffect(() => {
        getMajors();
        getMinors();
        getMyMajors();
        getMyMinors();

    }, [])

    var user = ""
     if(sessionStorage.getItem('user')){
    const decrypted = AES.decrypt(sessionStorage.getItem('user'), 'secret-key1')
     user = decrypted.toString(enc.Utf8);
     user = JSON.parse(user)
    }


    function getMajors() {
        dbUtil.getMajors().then(
            data => {
                setMajors(data)
            }
        )
    }
    function getMinors() {
        dbUtil.getMinors().then(
            data => {
                setMinors(data)
            }
        )
    }
    function getMyMajors(){
        dbUtil.getMyMajors(user.userID).then(
            data => {
                console.log(data)
                setMyMajors(data)
            }
        )
    }
    function getMyMinors(){
        dbUtil.getMyMinors(user.userID).then(
            data => {
                console.log(data)

                setMyMinors(data)
            }
        )
    }
    function addMajor(major){
    }
    function addMinor(minor){
    }
    function dropMajor(major){
    }
    function dropMinor(minor){
    }
 


    
   
    
    return(
    <div className="table-center">
        <h1 className="text-align">My Majors and Minors</h1>

        <div className='leftTable'>
        <StudentMajors studentMajors={myMajors} dropMajor={dropMajor}/>
        </div>
        <div className='rightTable'>
        <StudentMinors studentMinors={myMinors} dropMinor={dropMinor}/>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
        <hr/>
       
        <h1 className="text-align">Major/Minors Offered</h1>
        <div className='leftTable'>
        <MajorsTable majors = {majors} addMajor={addMajor}/>
        </div>
        <div className='rightTable'>
        <MinorsTable minors={minors} addMinor={addMinor}/>
        </div>
      
    </div>
    );
}
