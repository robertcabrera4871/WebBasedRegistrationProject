import ChoseSemester from './subComponents/ChoseSemester'
import { useState } from 'react';

function Schedule(){

    const [semesterSelect, setSemester]= useState()

    const onClick = (semesterChosen) => {
        setSemester(semesterChosen) 
    }
    
    return(
        <div id="align-center">
        <ChoseSemester semesterSelect={semesterSelect} onClick={onClick}/>
        </div>
    );
}

export default Schedule