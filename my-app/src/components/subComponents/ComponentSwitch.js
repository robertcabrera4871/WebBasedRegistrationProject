import Home from '../Home';
import Programs from '../Programs';
import Academics from '../Academics'
import Registration from '../Registration'
import Schedule from '../Schedule'
import Transcript from '../Transcript';
import AddMajorMinor from '../AddMajorMinor';
import ChangeMajorMinor from '../ChangMajorMinor'
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
import ModifyCatalog from '../ModifyCatalog';
import TimeWindow from '../TimeWindow';
import StatData from '../StatData';
import { Switch, Route, Redirect } from "react-router-dom";
import checkPrivs from '../../utilities/checkPrivs';
import ProtectedRoute from '../subComponents/ProtectedRoute'


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
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/changeMajorMinor" component={ChangeMajorMinor} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/changeMajorMinor" component={ChangeMajorMinor} allowed={false}></ProtectedRoute> 
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
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/degreeAudit" component={DegreeAudit} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/degreeAudit" component={DegreeAudit} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/modifyCatalog" component={ModifyCatalog} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/modifyCatalog" component={ModifyCatalog} allowed={false}></ProtectedRoute> 
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
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/timeWindow" component={TimeWindow} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/timeWindow" component={TimeWindow} allowed={false}></ProtectedRoute> 

            }
            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/statData" component={StatData} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/statData" component={StatData} allowed={false}></ProtectedRoute>
            }


        </Switch>
    );
}

export default ComponentSwitch