import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';
export default function AddTranscript(adminAccess){

var adminUser = adminAccess.location.state
let history = useHistory();
const grades = ['A', 'B', 'C', 'D', 'E', 'F', 'IP'];

const newRow = {
        CRN: "",
        studentID: adminUser,
        semesterYearID:"",
        grade:"",
    }

    async function submitChanges(e){
        e.preventDefault();
        if(!grades.includes(newRow.grade)){
            window.alert(`Valid entries for grade are ${grades}`)
            return("")
        }
        const res = await dbUtil.addStudentHistory(newRow)
        console.log(res)
        if(!res.err){
            history.goBack()
        }else{
            window.alert(res.err.sqlMessage)
        }
    }

    return(
        <Form id='align-center'>
        <h1 className="text-align">New Transcript Entry</h1>
    <Form.Group>
        <Form.Label>CRN</Form.Label>
        <Form.Control onChange={e => newRow.CRN = e.target.value} ></Form.Control>
        <Form.Label>Semester</Form.Label>
        <Form.Control onChange={e => newRow.semesterYearID = e.target.value} ></Form.Control>
        <Form.Label>Grade</Form.Label>
        <Form.Control onChange={e => newRow.grade = e.target.value} ></Form.Control>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
     </Form.Group>
    </Form>
    )   
}