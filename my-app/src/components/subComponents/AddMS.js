import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';
import { useState } from "react";


export default function AddMS(){
    
    let history = useHistory()

    const newRow = {
        CRN: "",
        sectionNum: "",
        courseID: "",
        departmentID: "",
        day: "",
        startTime: "",
        endTime:"",
        semesterYearID:"",
        roomID:"",
        lastName:"",
        firstName:"",
        availableSeats:"",
        capacity:"",
        facultyID: "X",
        timeSlotID: "Y"
    }


        async function submitChanges(e){
            e.preventDefault();
            for(const property in newRow){
               if(`${newRow[property].trim()}` === ""){
                   window.alert("Please ensure no fields are left empty");
                   return("")
               } 
            }

            const facResult = await checkFaculty();
            if(facResult.err){
                    window.alert(facResult.err.sqlMessage)
                }else if(facResult.length !== 1){
                   window.alert("No faculty found with that name")
                   return("");
                }else{
                   newRow.facultyID = facResult[0].userID;
                }
            const timeSlotResult = await checkTimeslot();
            //Add ifs for timeslot
            console.log(timeSlotResult)

            // const addMSResult = await addMS()
            //      if(addMSResult.err){
            //          window.alert(addMSResult.err.sqlMessage)
            //      }else if(addMSResult.affectedRows === 1){
            //         history.push('/home')
            //      }else{
            //          console.log(addMSResult)
            //      }

        }
        
        async function checkTimeslot(){
            const result = await dbUtil.getTimeSlotID(newRow.startTime, newRow.endTime)
            return result
        }
        async function addMS(){
            const result = await dbUtil.addMS(newRow)
            return result
        }
        async function checkFaculty(){
            const result = await dbUtil.getFacultyID(newRow.firstName, newRow.lastName)
            return result
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
            <Form.Label>Department</Form.Label>
            <Form.Control onChange={e => newRow.departmentID = e.target.value}></Form.Control>
            <Form.Label>Day</Form.Label>
            <Form.Control onChange={e => newRow.day = e.target.value} ></Form.Control>
            <Form.Label>StartTime</Form.Label>
            <Form.Control placeholder="HH:MM(AM/PM)"onChange={e => newRow.startTime = e.target.value}></Form.Control>
            <Form.Label>EndTime</Form.Label>
            <Form.Control placeholder="HH:MM(AM/PM)"onChange={e => newRow.endTime = e.target.value} ></Form.Control>
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