import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter} from "react-router-dom";
import HeaderBar from './components/HeaderBar';
import ComponentSwitch from './components/subComponents/ComponentSwitch';
import Login from './components/Login';
import useToken from './utilities/useTokens';

function App(){
  const {token, setToken} = useToken();

    if(!token){
      return <Login setToken={setToken} />
    }

    return(
    <div> 
    <HeaderBar setToken={setToken}/>
    <ComponentSwitch />
    </div>
    )
  }

ReactDOM.render( <BrowserRouter><App /></BrowserRouter>,document.getElementById('root')); 
