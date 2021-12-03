import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ChoseSemester from "./subComponents/ChoseSemester";
import { useHistory } from 'react-router';
import MasterSchedule from "./MasterSchedule";



function Home(){

    //delete old masterSchdule

    const [semesterSelect, setSemester]= useState()
    const onClick = (semesterChosen) => {
        setSemester(semesterChosen) 
    }

    

       return(
        <div >
        <ChoseSemester  semesterSelect={semesterSelect} onClick={onClick}/>
        <h1 className='text-align'>Master Schedule</h1>
        <b>Hover column to search, Click column to sort</b>
        <MasterSchedule/>

             <h3 id="sched-h-tag">Academic calendar</h3>
             <Button variant="warning" type="button">Edit</Button>
             <h2>
                 Fair day! 
             </h2>
            </div>
        
        
        


        
    );
}

export default Home