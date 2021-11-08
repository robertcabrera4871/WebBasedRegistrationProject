import React from "react";
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


    const onClick = (semesterChosen) => {
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
        <Form id="align-center">
            <h2 id="sched-h-tag">Schedule Search</h2><br/>
            <ChoseSemester semesterSelect={semesterSelect} onClick={onClick}/>
            <br/><br/><h3 id="sched-h-tag">Sort By</h3>

            <fieldset data-role="controlgroup" data-type="horizontal" id="sched-h-tag">
            <input  type="checkbox"  onClick={() => nameOnCheck()}id="nameSort"/>
            <label className="checkbox-pad" for="nameSort">Course Name</label>
            <input type="checkbox" onClick={() => dayOnCheck()}id="daySort"/>
            <label className="checkbox-pad" for="daySort">Day</label>
            <input type="checkbox"onClick={() => timeOnCheck()} id="timeSort"/>
            <label className="checkbox-pad" for="timeSort">Time</label>
            <input type="checkbox"onClick={() => courseOnCheck()} id="sectionSort"/>
            <label className="checkbox-pad" for="sectionSort">Course Section</label>
            <input type="checkbox" onClick={() => profOnCheck()}id="profSort"/>
            <label className="checkbox-pad"for="profSort">Professor</label>
            <br/> <br/>
            </fieldset>

            <Form.Group className="mb-3" show="false" id={nameShow}>
                <Form.Label>Enter Course Name:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" id={dayShow}>
                <Form.Label>Select day:</Form.Label>
                <fieldset data-role="controlgroup" data-type="horizontal" id="sched-h-tag">
                <input type="checkbox" id="monday"/>
                <label className="checkbox-pad" for="monday">Monday</label>
                <input  type="checkbox" id="tuesday"/>
                <label className="checkbox-pad" for="tuesday">Tuesday</label>
                <input type="checkbox" id="wednesday"/>
                <label className="checkbox-pad" for="wednesday">Wednesday</label>
                <input type="checkbox" id="thursday"/>
                <label className="checkbox-pad" for="thursday">Thursday</label>
                <input type="checkbox" id="friday"/>
                <label className="checkbox-pad" for="friday">Friday</label>
                <input type="checkbox" id="saturday"/>
                <label className="checkbox-pad" for="saturday">Saturday</label>
                <input type="checkbox" id="sunday"/>
                <label className="checkbox-pad" for="sunday">Sunday</label>
                </fieldset>
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
        </Form>
        


        
    );
}

export default Home