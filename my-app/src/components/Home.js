import React from "react";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import ChoseSemester from "./subComponents/ChoseSemester";


function Home(){

    const [semesterSelect, setSemester]= useState()

    const [nameShow, setNameShow]= useState(false)
    const [dayShow, setDayShow]= useState(false)
    const [timeShow, setTimeShow]= useState(false)
    const [courseShow, setCourseShow]= useState(false)
    const [profShow, setProfShow]= useState(false)


    const onClick = (semesterChosen) => {
        setSemester(semesterChosen) 
    }
    

       return(
        <div id="align-center">
        <Form>

            {/* Admin will be able to edit after searching */}
            <h2 id="sched-h-tag">Schedule Search</h2><br/>
            <ChoseSemester semesterSelect={semesterSelect} onClick={onClick}/>
            <br/><br/><h3 id="sched-h-tag">Sort By</h3>

            <fieldset data-role="controlgroup" data-type="horizontal" id="sched-h-tag">
            <input  type="checkbox"  onClick={() => setNameShow(!nameShow)}id="nameSort"/>
            <label className="checkbox-pad" htmlFor="nameSort">Course Name</label>
            <input type="checkbox" onClick={() => setDayShow(!dayShow)}id="daySort"/>
            <label className="checkbox-pad" htmlFor="daySort">Day</label>
            <input type="checkbox"onClick={() => setTimeShow(!timeShow)} id="timeSort"/>
            <label className="checkbox-pad" htmlFor="timeSort">Time</label>
            <input type="checkbox"onClick={() => setCourseShow(!courseShow)} id="sectionSort"/>
            <label className="checkbox-pad" htmlFor="sectionSort">Course Section</label>
            <input type="checkbox" onClick={() => setProfShow(!profShow)}id="profSort"/>
            <label className="checkbox-pad"htmlFor="profSort">Professor</label>
            <br/> <br/>
            </fieldset>

            {nameShow && <Form.Group className="mb-3" show="false">
                <Form.Label>Enter Course Name:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>}

            {dayShow &&
            <Form.Group className="mb-3">
                <Form.Label>Select day:</Form.Label>
                <fieldset data-role="controlgroup" data-type="horizontal" id="sched-h-tag">
                <input type="checkbox" id="monday"/>
                <label className="checkbox-pad" htmlFor="monday">Monday</label>
                <input  type="checkbox" id="tuesday"/>
                <label className="checkbox-pad" htmlFor="tuesday">Tuesday</label>
                <input type="checkbox" id="wednesday"/>
                <label className="checkbox-pad" htmlFor="wednesday">Wednesday</label>
                <input type="checkbox" id="thursday"/>
                <label className="checkbox-pad" htmlFor="thursday">Thursday</label>
                <input type="checkbox" id="friday"/>
                <label className="checkbox-pad" htmlFor="friday">Friday</label>
                <input type="checkbox" id="saturday"/>
                <label className="checkbox-pad" htmlFor="saturday">Saturday</label>
                <input type="checkbox" id="sunday"/>
                <label className="checkbox-pad" htmlFor="sunday">Sunday</label>
                </fieldset>
            </Form.Group>}

        
            {/* Needs period times etc! */}
            {timeShow &&
            <Form.Group className="mb-3">
                <Form.Label>Enter Time:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>}
            
            {courseShow &&
            <Form.Group className="mb-3">
                <Form.Label>Enter Course Section:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>}
            
            {profShow &&
            <Form.Group className="mb-3" >
                <Form.Label>Enter Professors Last Name:</Form.Label>
                <Form.Control type="text"></Form.Control>
            </Form.Group>}
            
            <br/>
            <Button variant="primary" type="submit">Submit</Button>

        {/* MAKE SURE HIDDEN ATTRIBUTES ARENT SENT BY FORM!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
        </Form>

             <h3 id="sched-h-tag">Academic calendar</h3>
             <Button variant="warning" type="button">Edit</Button>
             <h2>
                 Fair day! 
             </h2>
            </div>
        
        
        


        
    );
}

export default Home