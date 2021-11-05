import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

function ChoseSemester(){
    const [semesterSelect, setSemester]= useState()

    function onClick(semesterChosen){
        setSemester(semesterChosen) 
         }
    return(
        <Dropdown>
        <Dropdown.Toggle id="dropdown-basic ">
         Choose a Semester
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item> 
                <div onClick={() => onClick('Spring 2021')}>Spring 2021</div>
           </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => onClick('Fall 2022')}>Fall 2022</Dropdown.Item>
        </Dropdown.Menu>
        <br/><br/>Semester selected: {semesterSelect}
       </Dropdown>

    );
}

export default ChoseSemester