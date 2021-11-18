import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter} from "react-router-dom";
import HeaderBar from './components/HeaderBar';
import ComponentSwitch from './components/subComponents/ComponentSwitch';
import Login from './components/Login';
import useToken from './utilities/useTokens';
import useUser from './utilities/useUser'

function App(){
      //BASE 64 ENCRYPTION TO TOKEN
       const {token, setToken} = useToken();
       const {user, setUser} = useUser();


    if(!token){
      return <Login setUser={setUser} setToken={setToken} />
    } 

    return(
    <div> 
    <HeaderBar setToken={setToken} userType={user.userType} setUser={setUser}/>
    <ComponentSwitch />
    </div>
    )
  }

ReactDOM.render( <BrowserRouter><App /></BrowserRouter>,document.getElementById('root')); 
