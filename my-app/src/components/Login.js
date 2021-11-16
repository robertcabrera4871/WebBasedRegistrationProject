import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Button from 'react-bootstrap/Button'
import Axios from 'axios';
import PropTypes from 'prop-types';

async function login(email, password){
  const response = await Axios.post("http://localhost:8000/login", {
    email: email,
    password: password
  })
  return response.data
}

export default function Login({ setToken }){


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password).then(data => {
       if(data.message){
      console.log(data)
      console.log(data.message)
      setToken("fail");
      } 
       else if(data[0].userType === "admin")
       {
          console.log(data)
          setToken({token: 'admin'});
      }
  }).catch(err => console.log(err))
}

  const guestLogin = (e) =>{
    e.preventDefault();
    login("guest", "guest").then(data => {
       if(data.message){
      console.log(data.message)
      } else if(data[0].userType === "guest"){
        console.log(data)
        setToken({token: 'guest'});
        }
  }).catch(err => console.log(err))
    }

    return(
    <Form id='align-center' onSubmit={handleSubmit}>
      <h3 className="align-center text-align">User Login</h3>
  <FormGroup className="mb-3" controlId="formUsername">
    <FormLabel>Username</FormLabel>
    <Form.Control type="text" placeholder="Enter Username"
    onChange={e => setEmail(e.target.value)}/>
  </FormGroup>
  <FormGroup className="mb-3" controlId="formPassword">
    <FormLabel>Password</FormLabel>
    <Form.Control type="password" placeholder="Password"
     onChange={e => setPassword(e.target.value)}/>
  </FormGroup>
  <FormGroup>
  <Button  variant="success" type="submit">
    Login
  </Button>{' '}
  <Button className="login-button-right" variant="secondary" onClick={(e) => guestLogin(e)}>
    Continue as Guest
  </Button>{' '}
  </FormGroup>
  </Form>
    );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}