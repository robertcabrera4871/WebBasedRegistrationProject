import { useHistory } from 'react-router';
import React from "react";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";



export default function EditDepartment(rowData){
    const row = rowData.location.state

    var rowChanges = {...row}


    let history = useHistory();

    async function submitChanges(e){
        e.preventDefault();
        await editDepartment();
    }
    async function editDepartment(){
        const editResponse = await dbUtil.editDepartment(rowChanges, row.departmentID)
        if(editResponse?.err){
            window.alert(editResponse.err.sqlMessage)
        }else{
         history.push('/departments')
        }
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
    <h1 className="text-align">Editing {row.departmentID}</h1>
<Form.Group>
    <Form.Label>Department Name</Form.Label>
    <Form.Control placeholder={row.departmentID}onChange={e => rowChanges.departmentID = e.target.value} ></Form.Control>
    <Form.Label>RoomID</Form.Label>
    <Form.Control placeholder={row.roomID} onChange={e => rowChanges.roomID = e.target.value}></Form.Control>
    <Form.Label>Department Email</Form.Label>
    <Form.Control placeholder={row.dEmail} onChange={e => rowChanges.dEmail = e.target.value} ></Form.Control>
    <Form.Label>Department Phone</Form.Label>
    <Form.Control placeholder={row.dPhone} onChange={e => rowChanges.dPhone = e.target.value} ></Form.Control>
    <Form.Label>Department Chair</Form.Label>
    <Form.Control placeholder={row.dChair} onChange={e => rowChanges.dChair = e.target.value} ></Form.Control>
    <Form.Label>Department Manager</Form.Label>
    <Form.Control placeholder={row.dManager} onChange={e => rowChanges.dManager= e.target.value} ></Form.Control>
    <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
 </Form.Group>
</Form>
 )
}