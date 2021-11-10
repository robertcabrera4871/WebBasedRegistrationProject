import Login from '../Login';
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
import { Switch, Route} from "react-router-dom";

function ComponentSwitch(){
    return(
        <Switch>
        <Route path="/home" component={Home}></Route>
        {/* <Route path="/login" component={Login} ></Route> */}
        <Route path="/programs" component={Programs} ></Route>
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
        </Switch>
    );
}

export default ComponentSwitch