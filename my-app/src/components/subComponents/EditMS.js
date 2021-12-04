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
        console.log(row.CRN)
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
            <h1 className="text-align">Editing: {row.CourseID}</h1>
        <Form.Group>
            <Row>
                <Col>
            <Form.Label>CRN</Form.Label>
            <Form.Control onChange={e => rowChanges.CRN = e.target.value} placeholder={row.CRN}></Form.Control>
            <Form.Label>CourseSection</Form.Label>
            <Form.Control onChange={e => rowChanges.CourseSection = e.target.value} placeholder={row.CourseSection}></Form.Control>
            <Form.Label>CourseID</Form.Label>
            <Form.Control onChange={e => rowChanges.CourseID = e.target.value} placeholder={row.CourseID}></Form.Control>
            <Form.Label>Department</Form.Label>
            <Form.Control onChange={e => rowChanges.Department = e.target.value} placeholder={row.Department}></Form.Control>
            <Form.Label>Day</Form.Label>
            <Form.Control onChange={e => rowChanges.Day = e.target.value} placeholder={row.Day}></Form.Control>
            <Form.Label>StartTime</Form.Label>
            <Form.Control onChange={e => rowChanges.StartTime = e.target.value} placeholder={row.StartTime}></Form.Control>
            <Form.Label>EndTime</Form.Label>
            <Form.Control onChange={e => rowChanges.EndTime = e.target.value} placeholder={row.EndTime}></Form.Control>
            </Col>
                <Col>
           <Form.Label>Semester</Form.Label>
            <Form.Control onChange={e => rowChanges.Semester = e.target.value} placeholder={row.Semester}></Form.Control>
            <Form.Label>Year</Form.Label>
            <Form.Control onChange={e => rowChanges.Year = e.target.value} placeholder={row.Year}></Form.Control>
            <Form.Label>RoomNumber</Form.Label>
            <Form.Control onChange={e => rowChanges.RoomNumber = e.target.value} placeholder={row.RoomNumber}></Form.Control>
            <Form.Label>ProfLastName</Form.Label>
            <Form.Control onChange={e => rowChanges.ProfLastName = e.target.value} placeholder={row.ProfLastName}></Form.Control>
            <Form.Label>ProfFirstName</Form.Label>
            <Form.Control onChange={e => rowChanges.ProfFirstName = e.target.value} placeholder={row.ProfFirstName}></Form.Control>
            <Form.Label>Seats</Form.Label>
            <Form.Control onChange={e => rowChanges.Seats = e.target.value} placeholder={row.Seats}></Form.Control>
            <Form.Label>Capacity</Form.Label>
            <Form.Control onChange={e => rowChanges.Capacity = e.target.value} placeholder={row.Capacity}></Form.Control>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
            </Col>
            </Row>
         </Form.Group>
        </Form>
    )
}