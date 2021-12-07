import Home from '../Home';
import Programs from '../Programs';
import Academics from '../Academics'
import Registration from '../Registration'
import Schedule from '../Schedule'
import Transcript from '../Transcript';
import AddMajorMinor from '../AddMajorMinor';
import AddClass from '../AddClass';
import DropClass from '../DropClass';
import ViewHolds from '../ViewHolds';
import DegreeAudit from '../DegreeAudit';
import Advisors from '../Advisors'
import UndergradCatalog from '../UndergradCatalog';
import GradCatalog from '../GradCatalog';
import Advisees from '../Advisees';
import TeachScedule from '../TeachSchedule';
import Users from '../Users';
import FacHistory from '../FacHistory';
import TimeWindow from '../TimeWindow';
import StatData from '../StatData';
import { Switch, Route, Redirect } from "react-router-dom";
import checkPrivs from '../../utilities/checkPrivs';
import ProtectedRoute from '../subComponents/ProtectedRoute'
import MasterSchedule from '../MasterSchedule';
import AllUsers from '../AllUsers';
import EditMS from './EditMS';
import AddMS from './AddMS';
import AddMajor from './AddMajor';


function ComponentSwitch() {

    const privs = checkPrivs()

    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>

            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/programs" component={Programs}></Route>
            <Route exact path="/gradCatalog" component={GradCatalog}></Route>
            <Route exact path="/undergradCatalog" component={UndergradCatalog}></Route>
            <Route exact path="/masterSchedule" component={MasterSchedule}></Route>

            {
                (privs.isAdmin) ?
                <ProtectedRoute exact path ="/AddMajor" component={AddMajor} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddMajor" component={AddMajor} allowed={false}></ProtectedRoute> 
                
            }
            {
                (privs.isAdmin) ?
                <ProtectedRoute exact path ="/addMS" component={AddMS} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/addtMS" component={AddMS} allowed={false}></ProtectedRoute> 
                
            }
            {
                (privs.isAdmin) ?
                <ProtectedRoute exact path ="/editMS" component={EditMS} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/editMS" component={EditMS} allowed={false}></ProtectedRoute> 
                
            }
            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/registration" component={Registration} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/registration" component={Registration} allowed={false}></ProtectedRoute>
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/academics" component={Academics} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/academics" component={Academics} allowed={false}></ProtectedRoute>
            }

            {
                (privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/facHistory" component={FacHistory} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/facHistory" component={FacHistory} allowed={false}></ProtectedRoute>
            }

            {
                (privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/users" component={Users} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/users" component={Users} allowed={false}></ProtectedRoute>
            }


            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/advisors" component={Advisors} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/advisors" component={Advisors} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/schedule" component={Schedule} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/schedule" component={Schedule} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/transcript" component={Transcript} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/transcript" component={Transcript} allowed={false}></ProtectedRoute>
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/addMajorMinor" component={AddMajorMinor} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/addMajorMinor" component={AddMajorMinor} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/addClass" component={AddClass} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/addClass" component={AddClass} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/dropClass" component={DropClass} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/dropClass" component={DropClass} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/viewHolds" component={ViewHolds} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/viewHolds" component={ViewHolds} allowed={true}></ProtectedRoute> 
            }
            {
                (privs.isStudent || privs.isAdmin ) ?
                    <ProtectedRoute exact path="/degreeAudit" component={DegreeAudit} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/degreeAudit" component={DegreeAudit} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/advisees" component={Advisees} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/advisees" component={Advisees} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/teachSchedule" component={TeachScedule} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/teachSchedule" component={TeachScedule} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isAdmin) ?
                    <ProtectedRoute exact path="/timeWindow" component={TimeWindow} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/timeWindow" component={TimeWindow} allowed={false}></ProtectedRoute> 

            }
            {
                (privs.isAdmin || privs.isResearch) ?
                    <ProtectedRoute exact path="/statData" component={StatData} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/statData" component={StatData} allowed={false}></ProtectedRoute>
            }
            {
                (privs.isAdmin) ?
                <ProtectedRoute exact path="/allUsers" component={AllUsers} allowed={true}></ProtectedRoute>:
                <ProtectedRoute exact path="/allUsers" component={AllUsers} allowed={false}></ProtectedRoute>            
            }


        </Switch>
    );
}

export default ComponentSwitch