import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';


export default function AddMRequirement({majorID}){

    let history = useHistory();
    console.log(majorID)

    const newReq = {
        courseID: '',
        minCourseGrade: ''
    }

    async function submitChanges(e){
        e.preventDefault();
        if (await checkBlanks() === "" ){return("")}
        await addMReq();
        
    }

    async function checkBlanks(){
        for(const property in newReq){
            if(`${newReq[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
    }

    async function addMReq(){
        const response = await dbUtil.addMReq(newReq, majorID)
            if(response.err){
                window.alert(response.err.sqlMessage)
                return("")
            } else{
                history.push('/UndergradCatalog')
            }
        }
    
    return(
        <Form id='align-center'>
        <h1 className="text-align">New Requirement for: {majorID}</h1>
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