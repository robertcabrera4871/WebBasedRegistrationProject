import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';


export default function AddMS(){
    

    let history = useHistory()

    const newRow = {
        CRN: "",
        sectionNum: "",
        courseID: "",
        day: "",
        startTime: "",
        endTime:"",
        semesterYearID:"",
        roomID:"",
        lastName:"",
        firstName:"",
        availableSeats:"",
        capacity:"",
        facultyID: "default",
        timeSlotID: "default"
    }


        async function submitChanges(e){
            e.preventDefault();
            if (await checkBlanks() === "" ){return("")}
            if (await checkFaculty() === ""){return("")}
            if (await checkTimeSlotID() === ""){return("")}
            if (await checkAvailability() === ""){return("")}
            await addMS();
        }

        async function checkAvailability(){
            const response = await dbUtil.checkAvailability(newRow)
            if(response.err){
                window.alert(response.err.sqlMessage)
                return("")
            }
            if(response.length > 0){
                window.alert("That time slot / room combination is filled")
                return("")
            }
            return response
        }
        async function checkBlanks(){
            for(const property in newRow){
                if(`${newRow[property].trim()}` === ""){
                    window.alert("Please ensure no fields are left empty");
                    return("")
                } 
             }
        }

        async function checkFaculty(){
            const facResult = await dbUtil.getFacultyID(newRow.firstName, newRow.lastName);
            if(facResult.err){
                    window.alert(facResult.err.sqlMessage)
                }else if(facResult.length !== 1){
                   window.alert("No faculty found with that name")
                   return("");
                }else{
                   newRow.facultyID = facResult[0].userID;
                }
                return facResult
        }

        async function checkTimeSlotID(){
            const timeSlotResult = await dbUtil.getTimeSlotID(newRow.startTime, newRow.endTime, newRow.day);
            if(timeSlotResult.err){
                window.alert(timeSlotResult.err.sqlMessage)
            } else if(timeSlotResult.length !==1){
                window.alert("No timeslot found with that start/end time or day")
                return("");
            } else{
                newRow.timeSlotID = timeSlotResult[0].timeslotID.toString();
            }
            return timeSlotResult
        }

        async function addMS(){
            const addMSResult = await dbUtil.addMS(newRow);
                 if(addMSResult.err){
                     window.alert(addMSResult.err.sqlMessage)
                 }else if(addMSResult.affectedRows === 1){
                    history.push('/home')
                 }else{
                     console.log(addMSResult)
                 }
        }
        


    return(
        <Form id='align-center'>
            <h1 className="text-align">New Class</h1>
        <Form.Group>
            <Row>
                <Col>
                <Form.Label>CRN</Form.Label>
            <Form.Control onChange={e => newRow.CRN = e.target.value} ></Form.Control>
            <Form.Label>CourseSection</Form.Label>
            <Form.Control onChange={e => newRow.sectionNum = e.target.value} ></Form.Control>
            <Form.Label>CourseID</Form.Label>
            <Form.Control onChange={e => newRow.courseID = e.target.value} ></Form.Control>
            <Form.Label>Day</Form.Label>
            <Form.Control onChange={e => newRow.day = e.target.value} ></Form.Control>
            <Form.Label>StartTime</Form.Label>
            <Form.Control placeholder="HH:MM (AM/PM)"onChange={e => newRow.startTime = e.target.value}></Form.Control>
            <Form.Label>EndTime</Form.Label>
            <Form.Control placeholder="HH:MM (AM/PM)"onChange={e => newRow.endTime = e.target.value} ></Form.Control>
                </Col>
                <Col>
                <Form.Label>Semester</Form.Label>
            <Form.Control onChange={e => newRow.semesterYearID = e.target.value} ></Form.Control>
            <Form.Label>RoomNumber</Form.Label>
            <Form.Control onChange={e => newRow.roomID = e.target.value} ></Form.Control>
            <Form.Label>ProfLastName</Form.Label>
            <Form.Control onChange={e => newRow.lastName = e.target.value} ></Form.Control>
            <Form.Label>ProfFirstName</Form.Label>
            <Form.Control onChange={e => newRow.firstName = e.target.value} ></Form.Control>
            <Form.Label>Seats</Form.Label>
            <Form.Control onChange={e => newRow.availableSeats = e.target.value} ></Form.Control>
            <Form.Label>Capacity</Form.Label>
            <Form.Control onChange={e => newRow.capacity = e.target.value}></Form.Control>
                </Col>
            </Row>
            
            
           
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
         </Form.Group>
        </Form>
    )
}