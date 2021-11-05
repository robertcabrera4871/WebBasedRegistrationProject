import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from "react-router-dom";
import { Component } from "react"
import HeaderBar from './components/HeaderBar';
import Login from './components/Login';
import Home from './components/Home';
import Programs from './components/Programs';
import Academics from './components/Academics'
import Registration from './components/Registration'
import Schedule from './components/Schedule'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component{
  render(){ 
    return(
    <div> 
    <HeaderBar />
    <Route path="/home" component={Home}></Route>
    <Route path="/login" component={Login}></Route>
    <Route path="/programs" component={Programs}></Route>
    <Route path="/academics" component={Academics}></Route>
    <Route path="/registration" component={Registration}></Route>
    <Route path="/schedule" component={Schedule}></Route>
    </div>
    )
  }
}

ReactDOM.render( <BrowserRouter><App /></BrowserRouter>,document.getElementById('root')); 
