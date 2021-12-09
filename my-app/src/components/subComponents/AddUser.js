import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";

export default function AddUser(){

    let history = useHistory()

    const newRow = {
      userID: "",
      firstName: "",
      lastName: "",
      DOB: "",
      city: "",
      state: "",
      zipCode: "",
      address: "",
      userType: ""
    }

    async function submitChanges(e){
        e.preventDefault();
        if (await checkBlanks() === "" ){return("")}
        if (await createUser() === ""){return("")}
    }

    async function createUser(){
        const response = await dbUtil.createUser()
    }
    async function checkBlanks(){
        for(const property in newRow){
            if(`${newRow[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
    }

    return(
        <Form id='align-center'>
        <h1 className="text-align">New User</h1>
    <Form.Group>
        <Row>
            <Col>
        <Form.Label>UserID</Form.Label>
        <Form.Control onChange={e => newRow.userID = e.target.value} ></Form.Control>
        <Form.Label>First Name</Form.Label>
        <Form.Control onChange={e => newRow.userID = e.target.value} ></Form.Control>
        <Form.Label>Last Name</Form.Label>
        <Form.Control onChange={e => newRow.userID = e.target.value} ></Form.Control>
        <Form.Label>DOB</Form.Label>
        <Form.Control onChange={e => newRow.userID = e.target.value} ></Form.Control>
        <Form.Label>City</Form.Label>
        <Form.Control onChange={e => newRow.firstName = e.target.value} ></Form.Control>
        </Col>
        <Col>
        <Form.Label>State</Form.Label>
        <Form.Control onChange={e => newRow.lastName = e.target.value} ></Form.Control>
        <Form.Label>Zip Code</Form.Label>
        <Form.Control onChange={e => newRow.userID = e.target.value} ></Form.Control>
        <Form.Label>Address</Form.Label>
        <Form.Control onChange={e => newRow.address = e.target.value} ></Form.Control>
        <Form.Label>UserType</Form.Label>
        <Form.Control onChange={e => newRow.userType = e.target.value} ></Form.Control>
        </Col>
        </Row>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}


    </Form.Group>

        </Form>
    )

}
    