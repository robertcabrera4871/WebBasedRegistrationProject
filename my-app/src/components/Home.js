import React from "react";
import { useState } from "react";
import ChoseSemester from "./subComponents/ChoseSemester";
import MasterSchedule from "./MasterSchedule";



function Home(){

    const [semesterSelect, setSemester]= useState("Spring 2021")
    const onClick = (semesterChosen) => {
        setSemester(semesterChosen) 
    }

    

       return(
        <div >
        <ChoseSemester  semesterSelect={semesterSelect} onClick={onClick}/>
        <h1 className='text-align'>Master Schedule</h1>
      
        <MasterSchedule/>

             <h3 id="sched-h-tag">Academic calendar</h3>
             <h2>
                 Fair day! 
             </h2>
            </div>
        
        
        


        
    );
}

export default Home