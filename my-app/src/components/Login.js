import React, {useState } from 'react';
import Form from 'react-bootstrap/Form'
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Alert from "react-bootstrap/Alert"
import Button from 'react-bootstrap/Button'
import dbUtil from '../utilities/dbUtil'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import globalDate from '../utilities/globalDate';



export default function Login({ setUser, setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [invalidCred, setInvalidCred] = useState(false);
  const [alertMessage, setAlertMessage] = useState();
  const [incorrectCount, setIncorrectCount] = useState(3);
  const [invalidNewPass, setInvalidNewPass] = useState(false);
  const [inReset, setInReset] = useState(false)
  const [newPass, setNewPass] = useState();

  let history = useHistory();

  async function resetCounter() {

    if (incorrectCount === 0) {
      const res = await dbUtil.resetPassword(email)
      console.log(res)
      if(res.err){
        window.alert(res.err.sqlMessage)
        console.log(res)
      } else{
        setAlertMessage("Password reset. Check email for temporary password")
        setIncorrectCount(incorrectCount - 1)
      }
        
    }else if (incorrectCount !== -1) {
      setIncorrectCount(incorrectCount - 1)
      setAlertMessage("Incorrect password. Attempts left:  " + incorrectCount)
    }
  }

  const redirect = () => {
    history.push('/home')
  }
  
  function randomToken(){
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < 15; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }
     return result;
  }

  function privSwitch(data) {
    console.log(data)
    if (data.length === 0) {
      setInvalidCred(true);
      resetCounter()
    }
    else if (data[0].status.toLowerCase() === "locked") {
      setInReset(true)
    }
    else if (data === 0) {
      setInvalidCred(true);
      setAlertMessage("No user with that name")
    }

    else if (data[0].userType.toLowerCase() === "admin") {
      setUser(data[0]);
      setToken({ token: randomToken() });
      redirect();
    }
    else if (data[0].userType.toLowerCase() === "student") {
      setUser(data[0])
      setToken({ token: randomToken() });
      redirect();
    }
    else if (data[0].userType.toLowerCase() === "faculty") {
      setUser(data[0])
      setToken({ token: randomToken() });
      redirect();
    }
    else if (data[0].userType.toLowerCase() === "researcher") {
      setUser(data[0])
      setToken({ token: randomToken() });
      redirect();
    }
  else {
      console.log(data)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd
    globalDate.setGlobalDate(today)


    const response = await dbUtil.userExists(email)
    console.log(response)
    var loginResponse = ""
    if(response.length === 0){
      window.alert("User not found");
    } else if(response.err){
      window.alert(response.err.sqlMessage)
      return("")
    }
    else if(response.length > 1){
      window.alert("User not found")
      return("")
    }
    else{
      loginResponse = await dbUtil.login(email, password)
      console.log(loginResponse)
      if(loginResponse.err){
        window.alert(loginResponse.err.sqlMessage)
      } 
      console.log(loginResponse)
      privSwitch(loginResponse)
    }
  }

  const guestLogin = (e) => {
    e.preventDefault();
    dbUtil.login("guest", "guest").then(data => {
      console.log(data)
      if (data.message) {
        console.log(data.message)
      } else if (data[0].userType.toLowerCase() === "guest") {
        console.log(data)
        setUser(data[0])
        setToken({ token: 'guest' });
        redirect();
      }
    }).catch(err => console.log(err))
  }


  //Yikes
  const unlockAndLogin = (e) => {
    e.preventDefault();

    dbUtil.unlockAccount(email, newPass).then(data => {
      if (data.affectedRows === 1) {
        dbUtil.login(email, newPass).then(data => {
          privSwitch(data);
        }).catch(err => console.log(err))
      }
      else {
        setInvalidNewPass(true);
        console.log(data)
      }
    })

  }



  return (
    <Form id='align-center' onSubmit={handleSubmit}>
      <h3 className="align-center text-align">User Login</h3>
      {invalidCred && <Alert variant='danger'>{alertMessage} </Alert>}
      <FormGroup className="mb-3" controlId="formUsername">
        <FormLabel>Username</FormLabel>
        <Form.Control readOnly={inReset} type="text" placeholder="Enter Username"
          onChange={e => setEmail(e.target.value)} />
      </FormGroup>
      <FormGroup className="mb-3" controlId="formPassword">
        <FormLabel>Password</FormLabel>
        <Form.Control readOnly={inReset} type="password" placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
      </FormGroup>
      <FormGroup>
        <Button variant="success" type="submit">
          Login
        </Button>{' '}
        <Button className="login-button-right" variant="secondary" onClick={(e) => guestLogin(e)}>
          Continue as Guest
        </Button>{' '}
      </FormGroup>


      {inReset &&
        <div>
          <FormGroup className="topSpace">
            {invalidNewPass && <Alert variant='danger'>Invalid Password</Alert>}
            <FormLabel>Enter new password (No more then 25 characters)</FormLabel>
            <Form.Control onChange={e => setNewPass(e.target.value)} type="password">
            </Form.Control>
          </FormGroup>
          <FormGroup>
            <Button className="topSpace" variant="success" onClick={(e) => unlockAndLogin(e)}>
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