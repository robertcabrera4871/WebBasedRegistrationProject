import dbUtil from "../utilities/dbUtil";
import { useEffect, useState } from "react";
import React from 'react';
import MinorsTable from "./tableComponents/MinorsTable";
import MajorsTable from "./tableComponents/MajorsTable";
import StudentMajors from "./tableComponents/StudentMajors";
import StudentMinors from "./tableComponents/StudentMinors";
import decryptUser from "../utilities/decryptUser";

export default function AddMajorMinor(adminAccess){

    const [majors, setMajors] = useState([]);
    const [minors, setMinors] = useState([]);
    const [myMajors, setMyMajors] = useState([]);
    const [myMinors, setMyMinors] = useState([]);


    useEffect(() => {
        getMyMajors();
        getMyMinors();       
        getMajors();
        getMinors();
    }, [])
  
    var user = decryptUser();
    var adminUser = adminAccess.location.state; 

    if(adminUser !== undefined){
        user.userID = adminUser
      }




    function getMajors(majors) {
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
                setMyMajors(data)
            }
        )
    }
    function getMyMinors(){
        dbUtil.getMyMinors(user.userID).then(
            data => {
                setMyMinors(data)
            }
        )
    }
    
    function declareMyMajor(majorID){
         if(myMajors.length === 2)
        {
            window.alert("You can only have 2 majors")
        } else{
        dbUtil.declareMyMajor(majorID, user.userID).then(
            data =>{
                console.log(data)
                if(data?.err?.code)
                {
                    if(data.err.code === "ER_DUP_ENTRY")
                    {
                    window.alert("You are already enrolled in " + majorID) 
                    } 
                } else{
                    window.location.reload(false)
                    }                
            }
        )}
        }
    function dropMajor(majorID){
        dbUtil.dropMyMajor(majorID, user.userID).then(
                window.location.reload(false)
        )
    }

    function declareMyMinor(minorID){
        if(myMinors.length === 1)
        {
            window.alert("You can only have 1 minor")
        } else{
        dbUtil.declareMyMinor(minorID, user.userID).then(
            data =>{
                if(data?.err?.code)
                {
                    if(data.err.code === "ER_DUP_ENTRY")
                    {
                    window.alert("You are already enrolled in " + minorID) 
                    } 
                }
                     else{
                    window.location.reload(false)
                    }                
            })}}
    
    function dropMinor(minor){
        dbUtil.dropMyMinor(minor, user.userID).then(data =>{
            window.location.reload(false)
        })

    }
   
    
    return(
    <div className="table-center">
        <h1 className="text-align">My Majors and Minors</h1>

        <div className='leftTable'>
        <StudentMajors  studentMajors={myMajors} dropMajor={dropMajor}/>
        </div>
        <div className='rightTable'>
        <StudentMinors studentMinors={myMinors} dropMinor={dropMinor}/>
        </div>
        <br/><br/><br/><br/><br/><br/><br/>
        <hr/>
       
        <h1 className="text-align">Major/Minors Offered</h1>
        <div className='leftTable'>
        <MajorsTable  majors={majors} addMajor={declareMyMajor}/>
        </div>
        <div className='rightTable'>
        <MinorsTable minors={minors} addMinor={declareMyMinor}/>
        </div>
      
    </div>
    );
}
