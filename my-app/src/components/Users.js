//Faculty can only search for students
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import checkPrivs from "../utilities/checkPrivs";
import AllUsers from "./AllUsers";


export default function Users(){

    const privs = checkPrivs();

    return(
        <div>
             {privs.isAdmin && <AllUsers/>}
             {privs.isFaculty &&  <Form className="align-center">
            <Form.Label>Enter users first name</Form.Label>
            <Form.Control type="text"></Form.Control>
            <Form.Label>Enter users last name</Form.Label>
            <Form.Control type="text"></Form.Control>   
            <br/>
            <Button variant="primary" type="sumbit">Submit</Button>
            <br/> <br/>
        </Form>
             }
        </div>
       
    
    );
}
