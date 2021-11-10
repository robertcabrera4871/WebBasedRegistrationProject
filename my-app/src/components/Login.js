import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Button from 'react-bootstrap/Button'

//Dont understand need for this
import PropTypes from 'prop-types'

  //These will be in a seperate file later
  //https://www.digitalocean.com/community/tutorials/how-to-call-web-apis-with-the-useeffect-hook-in-react
async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
 

export default function Login({setToken}){

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();


  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token)
  }

    return(
    <Form id='align-center' onSubmit={handleSubmit}>
  <FormGroup className="mb-3" controlId="formUsername">
    <FormLabel>Username</FormLabel>
    <Form.Control type="text" placeholder="Enter Username"
    onChange={e => setUserName(e.target.value)}/>
  </FormGroup>
  <FormGroup className="mb-3" controlId="formPassword">
    <FormLabel>Password</FormLabel>
    <Form.Control type="password" placeholder="Password"
     onChange={e => setPassword(e.target.value)}/>
  </FormGroup>
  <Button className="checkbox-pad" variant="primary" type="submit">
    Submit
  </Button>{' '}
  <Button className="checkbox-pad" variant="primary" type="submit">
    Continue as Guest
  </Button>{' '}
  </Form>
    );
}

//Dont understand need for this
Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
