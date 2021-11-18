import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Alert from "react-bootstrap/Alert"
import Button from 'react-bootstrap/Button'
import Axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

async function login(email, password){

  const response = await Axios.post("http://localhost:8000/login", {
    email: email,
    password: password
  })
  return response.data
}

export default function Login({setUser, setToken}){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalidCred, setInvalidCred] = useState(false);
  let history = useHistory();

  const redirect = () =>{
    history.push('/home')
  }

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password).then(data => {
       if(data.message){
          setInvalidCred(true);
      } 
       else if(data[0].userType === "admin")
       {
          setUser(data[0]);
          setToken({token: 'admin'});
          redirect();
      }
      else if(data[0].userType === "student")
      {
         setUser(data[0])
         setToken({token: 'student'});
         redirect();
     }
     else if(data[0].userType === "faculty")
      {
         setUser(data[0])
         setToken({token: 'faculty'});
         redirect();
     }
     else if(data[0].userType === "research")
     {
        setUser(data[0])
        setToken({token: 'research'});
        redirect();
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
        setUser(data[0])
        setToken({token: 'guest'});
        redirect();
        }
  }).catch(err => console.log(err))
    }

    return(
    <Form id='align-center' onSubmit={handleSubmit}>
    <h3 className="align-center text-align">User Login</h3>
    {invalidCred && <Alert variant='danger'>Invalid Credentials</Alert>}
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