import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';

export default function AddMinorRequirement(minorInfo){
    let history = useHistory();
    const minor = minorInfo.location.state;

    const grades = ['A', 'B', 'C', 'D', 'E', 'IP'];


    const newReq = {
        courseID: '',
        minCourseGrade: ''
    }

    async function submitChanges(e){
        e.preventDefault();
        if(!grades.includes(newReq.minCourseGrade)){
            window.alert(`Valid entries are ${grades}`)
            return("")
        }
        if (await checkBlanks() === "" ){return("")}
        await addMinReq();
        
    }

    async function checkBlanks(){
        for(const property in newReq){
            if(`${newReq[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
    }

    async function addMinReq(){
        const response = await dbUtil.addMinReq(newReq, minor.minorID)
            if(response.err){
                window.alert(response.err.sqlMessage)
                return("")
            } else{
                history.push('/UndergradCatalog')
            }
        }

        return(
            <Form id='align-center'>
            <h1 className="text-align">New Requirement for: {minor.minorID}</h1>
        <Form.Group>
            <Form.Label>Course Name</Form.Label>
            <Form.Control onChange={e => newReq.courseID = e.target.value} ></Form.Control>
            <Form.Label>Minimum Grade</Form.Label>
            <Form.Control onChange={e => newReq.minCourseGrade = e.target.value}></Form.Control>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
         </Form.Group>
        </Form>
        )


}