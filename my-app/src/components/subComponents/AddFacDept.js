import { useHistory } from 'react-router-dom'
import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import dbUtil from '../../utilities/dbUtil';


export default function AddFacDept(){
let history = useHistory();

   const newRow = {
        facultyID: "",
        departmentID: history.location.state,
        percTimeCommitment: 50,
        dateOfAppt: "",
    }

    async function submitChanges(e){
        e.preventDefault();
        const res = await dbUtil.newDepAssign(newRow);
        if(!res.err){
            history.goBack();
        }
        console.log(res)
    }

    return(
        <Form id='align-center'>
        <h1 className="text-align">New Department Assignment</h1>
    <Form.Group>
        <Form.Label>Faculty ID</Form.Label>
        <Form.Control onChange={e => newRow.facultyID = e.target.value} ></Form.Control>
        <Form.Label>Percent Time Commitment: <div id ='range-div'></div></Form.Label>
        <Form.Range onChange={(e)=> {
            newRow.percTimeCommitment = e.target.value
            document.getElementById('range-div').innerHTML = e.target.value + '%'
        }}/>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
     </Form.Group>
    </Form>
    )
}