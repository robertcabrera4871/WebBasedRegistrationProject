import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from "react-router";

export default function AddMajor(){

    let history = useHistory();

    const newMajor = {
        majorID: "",
        departmentID: "",
        creditsRequired: ""
    }

    function submitChanges(e){
        e.preventDefault();
        for(const property in newMajor){
            if(`${newMajor[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
         dbUtil.addMajor(newMajor).then(data =>{
            if(data.err){
                window.alert(data.err.sqlMessage)
            }else if(data.affectedRows === 1){
                history.push('/undergradCatalog')
            }
        })
    }


    return(
        <Form id='align-center'>
            <h1 className="text-align">Add Major</h1>
        <Form.Group>
            <Form.Label>MajorID</Form.Label>
            <Form.Control onChange={e => newMajor.majorID = e.target.value}></Form.Control>
            <Form.Label>DepartmentID</Form.Label>
            <Form.Control onChange={e => newMajor.departmentID = e.target.value}></Form.Control>
            <Form.Label>Credits Required</Form.Label>
            <Form.Control onChange={e => newMajor.creditsRequired = e.target.value}></Form.Control>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
         </Form.Group>
        </Form>
    )
}