import React from "react";
import Form from 'react-bootstrap/Form'
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Button from 'react-bootstrap/Button'


function Login(){
    return(
    <Form>
  <FormGroup className="mb-3" controlId="formUsername">
    <FormLabel>Username</FormLabel>
    <Form.Control type="text" placeholder="Enter Username" />
  </FormGroup>
  <FormGroup className="mb-3" controlId="formPassword">
    <FormLabel>Password</FormLabel>
    <Form.Control type="password" placeholder="Password" />
  </FormGroup>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  </Form>
    );
}

export default Login