import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import dbUtil from "../../utilities/dbUtil";
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import { useHistory } from 'react-router';



export default function EditMS(rowData){
    
    const row = rowData.location.state
    var rowChanges = {...row}

    console.log(rowChanges)

    let history = useHistory();
    
    async function submitChanges(e){
        e.preventDefault();
        if(rowChanges.capacity < rowChanges.availableSeats){window.alert("Cannot be lower then available seats"); return("")}
        await trimWhiteSpace()
        if (await checkFaculty() === ""){return("")}
        if (await checkTimeSlotID() === ""){return("")}
        if(rowChanges.startTime !== row.startTime && rowChanges.endTime !== row.endTime){
            if (await checkAvailability() === ""){return("")}
        }
        if(rowChanges.numOfCredits !== row.numOfCredits){
            if(await changeNumOfCredits() === ""){return("")}
        }
        await editMS();
    }

    async function changeNumOfCredits(){
        const res = await dbUtil.changeNumOfCredits(rowChanges.courseID, rowChanges.numOfCredits)
        if(res.err){
            window.alert(res.err.sqlMessage)
            console.log(res)
            return("")
        }else{
            return("changed")
        }
    }

    async function trimWhiteSpace(rowChanges){
        for(const property in rowChanges){
            rowChanges[property] = rowChanges[property].trim()
         }
    }

    async function checkAvailability(){
        const response = await dbUtil.checkAvailability(rowChanges)
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

    async function editMS(){
        const editResponse = await dbUtil.editMS(rowChanges, row.CRN)
        console.log(editResponse)
        if(editResponse.err){
            window.alert(editResponse.err.sqlMessage)
        }else{
         history.push('/home')
        }
    }
    async function checkFaculty(){
        if(rowChanges.firstName === "TBD"){
            rowChanges.facultyID = "TBD"
            return("tbd")
        }
        const facResult = await dbUtil.getFacultyID(rowChanges.firstName, rowChanges.lastName);
        if(facResult.err){
                window.alert(facResult.err.sqlMessage)
            }else if(facResult.length !== 1){
               window.alert("No faculty found with that name")
               return("");
            }
            else{
                rowChanges.facultyID = facResult[0].userID;
            }
            return facResult
    }

    async function checkTimeSlotID(){
        const timeSlotResult = await dbUtil.getTimeSlotID(rowChanges.startTime, rowChanges.endTime, rowChanges.day);
        if(timeSlotResult.err){
            window.alert(timeSlotResult.err.sqlMessage)
        } else if(timeSlotResult.length !==1){
            window.alert("No timeslot found with that start/end time or day")
            return("");
        } else{
            rowChanges.timeSlotID = timeSlotResult[0].timeslotID.toString();
        }
        return timeSlotResult
    }



    if(!row){
        return(
            <div id='align-center'>
            <Alert variant="warning"> This page was accessed incorrectly.
             Please return to homepage</Alert>
             </div>
        ) 
    }
    return(
        <Form id='align-center'>
            <h1 className="text-align">Editing: {row.courseID}</h1>
        <Form.Group>
            <Row>
                <Col>
            <Form.Label>CRN</Form.Label>
            <Form.Control onChange={e => rowChanges.CRN = e.target.value} placeholder={row.CRN}></Form.Control>
            <Form.Label>CourseSection</Form.Label>
            <Form.Control onChange={e => rowChanges.sectionNum = e.target.value} placeholder={row.sectionNum}></Form.Control>
            <Form.Label>CourseID</Form.Label>
            <Form.Control onChange={e => rowChanges.courseID = e.target.value} placeholder={row.courseID}></Form.Control>
            <Form.Label>Day</Form.Label>
            <Form.Control onChange={e => rowChanges.day = e.target.value} placeholder={row.day}></Form.Control>
            <Form.Label>StartTime</Form.Label>
            <Form.Control onChange={e => rowChanges.startTime = e.target.value} placeholder={row.startTime}></Form.Control>
            <Form.Label>EndTime</Form.Label>
            <Form.Control onChange={e => rowChanges.endTime = e.target.value} placeholder={row.endTime}></Form.Control>
            </Col>
                <Col>
           <Form.Label>Semester</Form.Label>
            <Form.Control onChange={e => rowChanges.semesterYearID = e.target.value} placeholder={row.semesterYearID}></Form.Control>
            <Form.Label>RoomNumber</Form.Label>
            <Form.Control onChange={e => rowChanges.roomID = e.target.value} placeholder={row.roomID}></Form.Control>
            <Form.Label>ProfLastName</Form.Label>
            <Form.Control disabled={true} placeholder={row.lastName}></Form.Control>
            <Form.Label>ProfFirstName</Form.Label>
            <Form.Control disabled={true} placeholder={row.firstName}></Form.Control>
            <Form.Label>Seats</Form.Label>
            <Form.Control disabled={true} placeholder={row.availableSeats}></Form.Control>
            <Form.Label>Capacity</Form.Label>
            <Form.Control onChange={e => rowChanges.capacity = e.target.value} placeholder={row.capacity}></Form.Control>
            <Form.Label>Credits</Form.Label>
            <Form.Control onChange={e => rowChanges.numOfCredits = e.target.value} placeholder={row.numOfCredits}></Form.Control>
            </Col>
            </Row>
            <Row>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
            </Row>
         </Form.Group>
        </Form>
    )
}