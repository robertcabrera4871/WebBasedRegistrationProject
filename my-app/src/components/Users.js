//Faculty can only search for students
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

function Users(){
    return(
        <Form className="align-center">
            <Form.Label>Enter users first name</Form.Label>
            <Form.Control type="text"></Form.Control>
            <Form.Label>Enter users last name</Form.Label>
            <Form.Control type="text"></Form.Control>   
            <br/>
            <Button variant="primary" type="sumbit">Submit</Button>
            {/* FOR ADMIN ONLY */}
            <br/> <br/>
            <Button variant="info" type="sumbit">View all users</Button>
        </Form>
    
    );
}

export default Users