import React, {useState } from 'react';
import Form from 'react-bootstrap/Form'
import FormGroup from "react-bootstrap/esm/FormGroup";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Alert from "react-bootstrap/Alert"
import Button from 'react-bootstrap/Button'
import dbUtil from '../utilities/dbUtil'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';



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

  function resetCounter() {

    if (incorrectCount === 0) {
      dbUtil.resetPassword(email).then(
        setAlertMessage("Password reset. Check email for temporary password"),
        setIncorrectCount(incorrectCount - 1),
      )
    } else if (incorrectCount !== -1) {
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
    if (data.message) {
      setInvalidCred(true);
      resetCounter()
    }
    else if (data[0].status === "locked") {
      setInReset(true)
    }
    else if (data === 0) {
      setInvalidCred(true);
      setAlertMessage("No user with that name")
    }

    else if (data[0].userType === "admin") {
      setUser(data[0]);
      setToken({ token: randomToken() });
      redirect();
    }
    else if (data[0].userType === "student") {
      setUser(data[0])
      setToken({ token: randomToken() });
      redirect();
    }
    else if (data[0].userType === "faculty") {
      setUser(data[0])
      setToken({ token: randomToken() });
      redirect();
    }
    else if (data[0].userType === "research") {
      setUser(data[0])
      setToken({ token: randomToken() });
      redirect();
    }
    else {
      console.log(data)
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    dbUtil.login(email, password).then(data => {
      privSwitch(data);
    }).catch(err => console.log(err))
  }

  const guestLogin = (e) => {
    e.preventDefault();
    dbUtil.login("guest", "guest").then(data => {
      if (data.message) {
        console.log(data.message)
      } else if (data[0].userType === "guest") {
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