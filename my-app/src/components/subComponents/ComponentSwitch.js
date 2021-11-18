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


function ComponentSwitch() {

    const privs = checkPrivs()
    console.log(privs)

    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>

            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/programs" component={Programs}></Route>


            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/academics" component={Academics}></Route> :
                    <Redirect to="/home" />
            }


            {
                (privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/facHistory" component={FacHistory}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/users" component={Users}></Route> :
                    <Redirect to="/home" />
            }
              {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    (<Route exact path="/undergradCatalog" component={UndergradCatalog}></Route>) :
                    (<Redirect to="/home" />)
              }
              
            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/gradCatalog" component={GradCatalog}></Route> :
                    <Redirect to="/home" />
            }


            {/* Registration is cauising Fachistory to redirect??? */}
            {
                (privs.isStudent || privs.isAdmin) ?
                    <Route exact path="/registration" component={Registration}></Route> :
                    <Redirect to="/home" />
            }


            {
                (privs.isStudent || privs.isAdmin) ?
                    <Route exact path="/schedule" component={Schedule}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <Route exact path="/transcript" component={Transcript}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <Route exact path="/addMajorMinor" component={AddMajorMinor}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/changeMajorMinor" component={ChangeMajorMinor}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <Route exact path="/addClass" component={AddClass}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <Route exact path="/dropClass" component={DropClass}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <Route exact path="/viewHolds" component={ViewHolds}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/advisors" component={Advisors}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/degreeAudit" component={DegreeAudit}></Route> :
                    <Redirect to="/home" />
            }

          

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/modifyCatalog" component={ModifyCatalog}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/advisees" component={Advisees}></Route> :
                    <Redirect to="/home" />
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/teachSchedule" component={TeachScedule}></Route> :
                    <Redirect to="/home" />

            }


            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/timeWindow" component={TimeWindow}></Route> :
                    <Redirect to="/home" />

            }
            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <Route exact path="/statData" component={StatData}></Route> :
                    <Redirect to="/home" />
            }


        </Switch>
    );
}

export default ComponentSwitch