//Faculty can only search for students
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import checkPrivs from "../utilities/checkPrivs";
import { useHistory } from 'react-router';


export default function Users(){

    let history = useHistory();
    const privs = checkPrivs();


function viewUsers(){
    history.push('/allUsers')
}

    return(
        <Form className="align-center">
            <Form.Label>Enter users first name</Form.Label>
            <Form.Control type="text"></Form.Control>
            <Form.Label>Enter users last name</Form.Label>
            <Form.Control type="text"></Form.Control>   
            <br/>
            <Button variant="primary" type="sumbit">Submit</Button>
            <br/> <br/>
            {privs.isAdmin && 
            <Button variant="info" onClick={(e) => viewUsers(e)}>View all users</Button>}
        </Form>
    
    );
}
