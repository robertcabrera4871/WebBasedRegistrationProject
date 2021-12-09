import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';

export default function AddRoom(){

    let history = useHistory();

    const roomType = ['Classroom', 'Lab', 'Office']

    const newRoom = {
        roomID : "",
        buildingID: '',
        roomType: '',
        capacity: '',
    }

    async function submitChanges(e){
        e.preventDefault();
        if(!roomType.includes(newRoom.roomType)){
            window.alert('Make sure roomtype is Lab, Office, or Classroom')
        }
        if (await checkBlanks() === "" ){return("")}
        if (await addRoom() === ""){return("")}
        await addRoomOfType();
        
    }

    async function addRoomOfType(){
        const response = await dbUtil.addRoomOfType(newRoom)
        if(response.err){
            window.alert(response.err.sqlMessage)
        } else{
          history.push('/buildAndRoom')
            }
        }

    async function checkBlanks(){
        for(const property in newRoom){
            if(`${newRoom[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
    }
    async function addRoom(){
    const response = await dbUtil.addRoom(newRoom)
    if(response.err){
        console.log(response.err)
        window.alert(`Please ensure building exists and Room Type is Lab, Office, or Classroom`)
        return("")
    } 
    return(response)
    }

    return(
        <Form id='align-center'>
            <h1 className="text-align">New Room</h1>
        <Form.Group>
            <Form.Label>Room Name</Form.Label>
            <Form.Control onChange={e => newRoom.roomID = e.target.value} ></Form.Control>
            <Form.Label>Building Name</Form.Label>
            <Form.Control onChange={e => newRoom.buildingID = e.target.value} ></Form.Control>
            <Form.Label>Room Type</Form.Label>
            <Form.Control onChange={e => newRoom.roomType = e.target.value}></Form.Control>
            <Form.Label>Capacity</Form.Label>
            <Form.Control onChange={e => newRoom.capacity = e.target.value}></Form.Control>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
         </Form.Group>
        </Form>
    )
}