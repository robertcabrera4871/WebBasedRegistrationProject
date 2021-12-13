import { useHistory } from 'react-router';
import React from "react";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";



export default function EditCourse(rowData){
    const row = rowData.location.state

    var rowChanges = {...row}


    let history = useHistory();
    
    function submitChanges(e){
        e.preventDefault();
        dbUtil.editCourse(rowChanges, row.courseID).then(data =>{
        if(data?.err){
         window.alert(data.err.sqlMessage)
        }else{
         history.push('/undergradCatalog')
        }
        })
    }

    if(!row){
        return(
            <div id='align-center'>
            <Alert variant="warning"> This page was accessed incorrectly.
             Please return to previous page</Alert>
             </div>
        ) 
    }

    return(
        <Form id='align-center'>
            <h1 className="text-align">Editing: {row.courseID}</h1>
        <Form.Group>
        <Form.Label>Course Name</Form.Label>
                <Form.Control placeholder={row.courseID}
                disabled = {true}></Form.Control>
                <Form.Label>DepartmentID</Form.Label>
                <Form.Control  placeholder={row.departmentID}
                onChange={e => rowChanges.departmentID = e.target.value}></Form.Control>
                <Form.Label>Credits</Form.Label>
                <Form.Control  placeholder={row.numOfCredits}
                onChange={e => rowChanges.numOfCredits = e.target.value}></Form.Control>
                <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
        </Form.Group>

        </Form>
    )
}