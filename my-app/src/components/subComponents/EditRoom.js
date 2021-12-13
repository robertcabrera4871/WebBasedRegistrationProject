import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';


export default function EditRoom(rowData){
    const row = rowData.location.state
    var rowChanges = {...row}
    let history = useHistory();

    async function submitChanges(e){
        e.preventDefault();
        await editRoom();
    }

    async function editRoom(){
        const editResponse = await dbUtil.editRoom(rowChanges, row.roomID)
        if(editResponse.err){
            window.alert(editResponse.err.sqlMessage)
        }else{
            history.push('/buildAndRoom')
        }
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
        <h1 className="text-align">Editing {row.roomID}</h1>
    <Form.Group>
        <Form.Label>Room Name</Form.Label>
        <Form.Control placeholder={row.roomID}onChange={e => rowChanges.roomID = e.target.value} ></Form.Control>
        <Form.Label>Building Name</Form.Label>
        <Form.Control placeholder={row.buildingID} disabled={true}></Form.Control>
        <Form.Label>Room Type</Form.Label>
        <Form.Control placeholder={row.roomType} disabled={true}></Form.Control>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
     </Form.Group>
    </Form>
     )
}