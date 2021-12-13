import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from "react-router";

export default function AddMinor(){

    let history = useHistory();

    const newMinor = {
        minorID: "",
        departmentID: "",
        creditsRequired: ""
    }

    function submitChanges(e){
        e.preventDefault();
        for(const property in newMinor){
            if(`${newMinor[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
         dbUtil.addMinor(newMinor).then(data =>{
            if(data.err){
                window.alert(data.err.sqlMessage)
            }else if(data.affectedRows === 1){
                history.push('/undergradCatalog')
            }
        })
    }


    return(
        <Form id='align-center'>
            <h1 className="text-align">Add Minor</h1>
        <Form.Group>
            <Form.Label>MinorID</Form.Label>
            <Form.Control onChange={e => newMinor.minorID = e.target.value}></Form.Control>
            <Form.Label>DepartmentID</Form.Label>
            <Form.Control onChange={e => newMinor.departmentID = e.target.value}></Form.Control>
            <Form.Label>Credits Required</Form.Label>
            <Form.Control onChange={e => newMinor.creditsRequired = e.target.value}></Form.Control>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
         </Form.Group>
        </Form>
    )
}