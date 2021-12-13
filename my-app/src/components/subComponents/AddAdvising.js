import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';

export default function AddAdvising(){
    let history = useHistory();

    const newRow = {
        facultyID: '',
        studentID: '',
    }

    async function submitChanges(e){
        e.preventDefault();
        if (await checkBlanks() === "" ){return("")}
        await addStudentAdvising();
        
    }

    async function addStudentAdvising(){
        const response = await dbUtil.addAdvising(newRow)
            if(response.err){
                window.alert(response.err.sqlMessage)
                return("")
            } else{
                history.goBack();
            }
        }



    async function checkBlanks(){
        for(const property in newRow){
            if(`${newRow[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
    }

    return(
        <Form id='align-center'>
        <h1 className="text-align">New Faculty Advising</h1>
    <Form.Group>
        <Form.Label>Student ID</Form.Label>
        <Form.Control onChange={e => newRow.studentID = e.target.value} ></Form.Control>
        <Form.Label>Faculty ID</Form.Label>
        <Form.Control onChange={e => newRow.facultyID = e.target.value}></Form.Control>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
     </Form.Group>
    </Form>
    )
}