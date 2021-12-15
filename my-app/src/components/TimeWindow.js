import CalendarTable from "./tableComponents/CalendarTable";
import ChoseSemester from "./subComponents/ChoseSemester";

import React, {useState} from "react";

export default function TimeWindow(){
    const [semesterSelect, setSemester]= useState("Fall 2021")
    // let history = useHistory();
    // const privs = checkPrivs();


    function choseSemester (semesterChosen) {
        setSemester(semesterChosen) 
    }

    return(
        <div>
        <ChoseSemester onClick={choseSemester} semesterSelect={semesterSelect} />
        <CalendarTable semesterSelect={semesterSelect}/>
        </div>
    );
}
