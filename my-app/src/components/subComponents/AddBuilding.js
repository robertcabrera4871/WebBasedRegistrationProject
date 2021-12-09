import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';


export default function AddBuilding(){
    let history = useHistory();

    const newBuilding = {
        buildingID: '',
        buildingUse: ''
    }
    
    async function submitChanges(e){
        e.preventDefault();
        if (await checkBlanks() === "" ){return("")}
        await addBuilding();
        
    }
    async function checkBlanks(){
        for(const property in newBuilding){
            if(`${newBuilding[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
    }

    async function addBuilding(){
    const response = await dbUtil.addBuilding(newBuilding)
        if(response.err){
            window.alert(response.err.sqlMessage)
            return("")
        } else{
            history.push('/buildAndRoom')
        }
    }

    return(
        <Form id='align-center'>
        <h1 className="text-align">New Building</h1>
    <Form.Group>
        <Form.Label>Building Name</Form.Label>
        <Form.Control onChange={e => newBuilding.buildingID = e.target.value} ></Form.Control>
        <Form.Label>Building Use</Form.Label>
        <Form.Control onChange={e => newBuilding.buildingUse = e.target.value}></Form.Control>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
     </Form.Group>
    </Form>
    )



}