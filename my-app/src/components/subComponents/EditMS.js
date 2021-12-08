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


    let history = useHistory();
    
    function submitChanges(e){
        e.preventDefault();
        dbUtil.editMS(rowChanges, row.CRN).then(data =>{
        if(data.err){
            window.alert(data.err.sqlMessage)
        }else{
         history.push('/home')
        }
        })
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
            <Form.Label>Department</Form.Label>
            <Form.Control onChange={e => rowChanges.departmentID = e.target.value} placeholder={row.departmentID}></Form.Control>
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
            <Form.Control onChange={e => rowChanges.lastName = e.target.value} placeholder={row.lastName}></Form.Control>
            <Form.Label>ProfFirstName</Form.Label>
            <Form.Control onChange={e => rowChanges.firstName = e.target.value} placeholder={row.firstName}></Form.Control>
            <Form.Label>Seats</Form.Label>
            <Form.Control onChange={e => rowChanges.availableSeats = e.target.value} placeholder={row.availableSeats}></Form.Control>
            <Form.Label>Capacity</Form.Label>
            <Form.Control onChange={e => rowChanges.capacity = e.target.value} placeholder={row.capacity}></Form.Control>
            </Col>
            </Row>
            <Row>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
            </Row>
         </Form.Group>
        </Form>
    )
}