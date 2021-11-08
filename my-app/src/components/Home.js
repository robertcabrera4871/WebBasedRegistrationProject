import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ChoseSemester from "./subComponents/ChoseSemester";


function Home(){

    const [semesterSelect, setSemester]= useState()

    const [nameShow, setNameShow]= useState("hidden")
    const [dayShow, setDayShow]= useState("hidden")
    const [timeShow, setTimeShow]= useState("hidden")
    const [courseShow, setCourseShow]= useState("hidden")
    const [profShow, setProfShow]= useState("hidden")


    function onClick(semesterChosen){
    setSemester(semesterChosen) 
     }

    function nameOnCheck(){
        nameShow === "hidden" ? setNameShow("show") : setNameShow("hidden");
    }
    function dayOnCheck(){
        dayShow === "hidden" ? setDayShow("show") : setDayShow("hidden");
    }

    function timeOnCheck(){
        timeShow === "hidden" ? setTimeShow("show") : setTimeShow("hidden");
    }

    function courseOnCheck(){
        courseShow === "hidden" ? setCourseShow("show") : setCourseShow("hidden");
    }
    function profOnCheck(){
        profShow === "hidden" ? setProfShow("show") : setProfShow("hidden");
    }

       return(
        <div id="align-center">
            <h2 id="sched-h-tag">Schedule Search</h2><br/>
            <ChoseSemester semesterSelect={semesterSelect} onClick={onClick}/>
            <br/><br/><h3 id="sched-h-tag">Sort By</h3>
            <input type="checkbox" onClick={() => nameOnCheck()}id="nameSort"/>
            <label for="nameSort">Course Name</label>
            <br/><input type="checkbox" onClick={() => dayOnCheck()}id="daySort"/>
            <label for="daySort">Day</label>
            <br/><input type="checkbox"onClick={() => timeOnCheck()} id="timeSort"/>
            <label for="timeSort">Time</label>
            <br/><input type="checkbox"onClick={() => courseOnCheck()} id="sectionSort"/>
            <label for="sectionSort">Course Section</label>
            <br/><input type="checkbox" onClick={() => profOnCheck()}id="profSort"/>
            <label for="profSort">Professor</label>

            <Form.Group className="mb-3" show="false" id={nameShow}>
                <Form.Label>Enter Course Name:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" id={dayShow}>
                <Form.Label>Select day:</Form.Label>
                <br/><input type="checkbox" id="monday"/>
                <label for="monday">Monday</label>
                <br/><input type="checkbox" id="tuesday"/>
                <label for="tuesday">Tuesday</label>
                <br/><input type="checkbox" id="wednesday"/>
                <label for="wednesday">Wednesday</label>
                <br/><input type="checkbox" id="thursday"/>
                <label for="thursday">Thursday</label>
                <br/><input type="checkbox" id="friday"/>
                <label for="friday">Friday</label>
                <br/><input type="checkbox" id="saturday"/>
                <label for="saturday">Saturday</label>
                <br/><input type="checkbox" id="sunday"/>
                <label for="sunday">Sunday</label>
            </Form.Group>

        
            {/* Needs period times etc! */}
            <Form.Group className="mb-3" id={timeShow}>
                <Form.Label>Enter Time:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" id={courseShow}>
                <Form.Label>Enter Course Section:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-3" id={profShow}>
                <Form.Label>Enter Professors Last Name:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>
            
            <br/>
            <Button variant="dark" type="sumbit">Submit</Button>

            
        {/* MAKE SURE HIDDEN ATTRIBUTES ARENT SENT BY FORM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                <h3 id="sched-h-tag">Academic calendar</h3>
        </div>
        


        
    );
}

export default Home