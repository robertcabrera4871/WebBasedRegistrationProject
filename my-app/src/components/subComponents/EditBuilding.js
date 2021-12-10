import { useHistory } from 'react-router';
import React from "react";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";

export default function EditBuilding(rowData){
    const row = rowData.location.state

    var rowChanges = {...row}


    let history = useHistory();

    async function submitChanges(e){
        e.preventDefault();
        await editBuilding();
    }
    async function editBuilding(){
        const editResponse = await dbUtil.editBuilding(rowChanges, row.buildingID)
        if(editResponse?.err){
            window.alert(editResponse.err.sqlMessage)
        }else{
         history.push('/buildAndRoom')
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
        <h1 className="text-align">Editing {row.buildingID}</h1>
    <Form.Group>
        <Form.Label>Building Name</Form.Label>
        <Form.Control placeholder={row.buildingID}onChange={e => rowChanges.buildingID = e.target.value} ></Form.Control>
        <Form.Label>Building Use</Form.Label>
        {/* Spelled incorrectly in DB */}
        <Form.Control placeholder={row.buidingUse} onChange={e => rowChanges.buidingUse = e.target.value}></Form.Control>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
     </Form.Group>
    </Form>
     )
}