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
  const existResponse = await Axios.get("http://localhost:8000/emailExist", {
        params: {
          email: email
        }
      })
  const existResponseData = existResponse.data[0]
  const doesExist = (existResponseData["EXISTS (SELECT 1 FROM LoginInfo WHERE email = '" + email + "')"])

  if(!doesExist){
    return doesExist;
  }else{
  const loginResponse = await Axios.post("http://localhost:8000/login", {
    email: email,
    password: password
  })
  return loginResponse.data
}
}

async function resetPassword(email){
  const resetResponse = await Axios.put("http://localhost:8000/resetPassword", {
    params: {
      email: email
    }
  })
  console.log(resetResponse)
  return resetResponse.data
}

async function unlockAccount(email, newPass){
  const unlockResponse = await Axios.put("http://localhost:8000/updateAndUnlock", {
    params: {
      email: email,
      newPass: newPass
    }
  })
  return unlockResponse.data
}



export default function Login({setUser, setToken}){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalidCred, setInvalidCred] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [incorrectCount, setIncorrectCount] = useState(3);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [inReset, setInReset] = useState(false)
  const[newPass, setNewPass] = useState();

  let history = useHistory();

  function resetCounter(){

    if(incorrectCount === 0){
      resetPassword(email).then(
      setAlertMessage("Password reset. Check email for temporary password"),
      setIncorrectCount(incorrectCount - 1),
      )
    } else if(incorrectCount !== -1){
    setIncorrectCount(incorrectCount - 1)
    setAlertMessage("Incorrect password. Attempts left:  " + incorrectCount)
    } 
  }

  const redirect = () =>{
    history.push('/home')
  }

  const handleSubmit = e => {
    e.preventDefault();
    login(email, password).then(data => {
      console.log(data)
       if(data.message){
          setInvalidCred(true);
          resetCounter()
       }
       else if(data[0].status === "locked"){
          setInReset(true)  
       }
       else if(data === 0){
         setInvalidCred(true);
         setAlertMessage("No user with that name")
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
    else{
      console.log(data)
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
  

  //SET PASSWORD IS NOT RE RENDERING BEFORE HANDLE SUBMIT IS CALLED FML
  //Need to press button twice
  const unlockAndLogin = (e) =>{
    e.preventDefault();
    unlockAccount(email, newPass).then(data => {
      if(data.affectedRows === 1){
        setPassword(newPass);
      } else{
        setResetSuccess(true)
      }
    }
    )
    handleSubmit(e);
  }


    return(
    <Form id='align-center' onSubmit={handleSubmit}>
    <h3 className="align-center text-align">User Login</h3>
    {invalidCred && <Alert variant='danger'>{alertMessage} </Alert>}
  <FormGroup className="mb-3" controlId="formUsername">
    <FormLabel>Username</FormLabel>
    <Form.Control readOnly={inReset} type="text" placeholder="Enter Username"
    onChange={e => setEmail(e.target.value)}/>
  </FormGroup>
  <FormGroup className="mb-3" controlId="formPassword">
    <FormLabel>Password</FormLabel>
    <Form.Control readOnly={inReset} type="password" placeholder="Password"
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


 {inReset && 
    <div>
    <FormGroup className="topSpace">
    {resetSuccess && <Alert variant='danger'>Invalid Password</Alert>}
    <FormLabel>Enter new password (No more then 25 characters)</FormLabel>
    <Form.Control onChange={e => setNewPass(e.target.value)} type="password">
    </Form.Control>
    </FormGroup>
    <FormGroup>
    <Button className="topSpace" variant="success" type="submit" onClick={(e) => unlockAndLogin(e)}>
    Submit Change
  </Button>{' '}
  </FormGroup>
  </div>}

  </Form>
    );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}