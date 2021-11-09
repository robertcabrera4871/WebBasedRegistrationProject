import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route} from "react-router-dom";
import { Component } from "react"
import HeaderBar from './components/HeaderBar';
import Login from './components/Login';
import Home from './components/Home';
import Programs from './components/Programs';
import Academics from './components/Academics'
import Registration from './components/Registration'
import Schedule from './components/Schedule'
import Transcript from './components/Transcript';
import AddMajorMinor from './components/AddMajorMinor';
import ChangeMajorMinor from './components/ChangMajorMinor'
import AddClass from './components/AddClass';
import DropClass from './components/DropClass';
import ViewHolds from './components/ViewHolds';
import DegreeAudit from './components/DegreeAudit';
import Advisors from './components/Advisors'
import UndergradCatalog from './components/UndergradCatalog';
import GradCatalog from './components/GradCatalog';
import Advisees from './components/Advisees';
import TeachScedule from './components/TeachSchedule';
import Users from './components/Users';
import FacHistory from './components/FacHistory';
import ModifyCatalog from './components/ModifyCatalog';
import TimeWindow from './components/TimeWindow';
import StatData from './components/StatData';

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
    <Route path="/transcript" component={Transcript}></Route>
    <Route path="/addMajorMinor" component={AddMajorMinor}></Route>
    <Route path="/changeMajorMinor" component={ChangeMajorMinor}></Route>
    <Route path="/addClass" component={AddClass}></Route>
    <Route path="/dropClass" component={DropClass}></Route>
    <Route path="/viewHolds" component={ViewHolds}></Route>
    <Route path="/advisors" component={Advisors}></Route>
    <Route path="/degreeAudit" component={DegreeAudit}></Route>
    <Route path="/undergradCatalog" component={UndergradCatalog}></Route>
    <Route path="/gradCatalog" component={GradCatalog}></Route>
    <Route path="/modifyCatalog" component={ModifyCatalog}></Route>
    <Route path="/advisees" component={Advisees}></Route>
    <Route path="/teachSchedule" component={TeachScedule}></Route>
    <Route path="/users" component={Users}></Route>
    <Route path="/facHistory" component={FacHistory}></Route>
    <Route path="/timeWindow" component={TimeWindow}></Route>
    <Route path="/statData" component={StatData}></Route>
    </div>
    )
  }
}

ReactDOM.render( <BrowserRouter><App /></BrowserRouter>,document.getElementById('root')); 
