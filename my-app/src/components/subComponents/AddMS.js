import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';


export default function AddMS(){

    const newRow = {
        CRN: "",
        CourseSection: "",
        CourseID: "",
        Department: "",
        Day: "",
        StartTime: "",
        EndTime:"",
        Semester:"",
        Year:"",
        RoomNumber:"",
        ProfLastName:"",
        ProfFirstName:"",
        Seats:"",
        Capacity:""}

        function submitChanges(e){
            e.preventDefault();
            for(const property in newRow){
               if(`${newRow[property].trim()}` === ""){
                   window.alert("Please ensure no fields are left empty");
                   return("")
               } 
            }
             dbUtil.addMS(newRow).then(data =>{
                 console.log(data.err)
                 if(data.err){
                     window.alert(data.err.sqlMessage)
                 }else{
                     //change to reroute after
                     console.log(data)
                 }
             })
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
            <Form.Control onChange={e => newRow.CourseSection = e.target.value} ></Form.Control>
            <Form.Label>CourseID</Form.Label>
            <Form.Control onChange={e => newRow.CourseID = e.target.value} ></Form.Control>
            <Form.Label>Department</Form.Label>
            <Form.Control onChange={e => newRow.Department = e.target.value}></Form.Control>
            <Form.Label>Day</Form.Label>
            <Form.Control onChange={e => newRow.Day = e.target.value} ></Form.Control>
            <Form.Label>StartTime</Form.Label>
            <Form.Control onChange={e => newRow.StartTime = e.target.value}></Form.Control>
            <Form.Label>EndTime</Form.Label>
            <Form.Control onChange={e => newRow.EndTime = e.target.value} ></Form.Control>
                </Col>
                <Col>
                <Form.Label>Semester</Form.Label>
            <Form.Control onChange={e => newRow.Semester = e.target.value} ></Form.Control>
                <Form.Label>Year</Form.Label>
            <Form.Control onChange={e => newRow.Year = e.target.value} ></Form.Control>
            <Form.Label>RoomNumber</Form.Label>
            <Form.Control onChange={e => newRow.RoomNumber = e.target.value} ></Form.Control>
            <Form.Label>ProfLastName</Form.Label>
            <Form.Control onChange={e => newRow.ProfLastName = e.target.value} ></Form.Control>
            <Form.Label>ProfFirstName</Form.Label>
            <Form.Control onChange={e => newRow.ProfFirstName = e.target.value} ></Form.Control>
            <Form.Label>Seats</Form.Label>
            <Form.Control onChange={e => newRow.Seats = e.target.value} ></Form.Control>
            <Form.Label>Capacity</Form.Label>
            <Form.Control onChange={e => newRow.Capacity = e.target.value}></Form.Control>
                </Col>
            </Row>
            
            
           
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
         </Form.Group>
        </Form>
    )
}