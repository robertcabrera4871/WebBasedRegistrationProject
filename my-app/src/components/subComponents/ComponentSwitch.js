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
import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import AddUser from './AddUser';
import BuildAndRoom from '../BuildAndRoom';
import addBuilding from './AddBuilding';
import AddRoom from './AddRoom';
import Departments from '../Departments';
import AddMRequirement from './AddMRequirement';
import AddDepartment from './AddDepartment';
import EditDepartment from './EditDepartment';
import EditBuilding from './EditBuilding';
import EditRoom from './EditRoom';
import EditUser from './EditUser';
import AddMinor from './AddMinor';
import AddMinorRequirement from './AddMinorRequirement';
import AddAdvising from './AddAdvising';
import AddMeeting from './AddMeeting';
import ClassListTable from '../tableComponents/ClassListTable';
import AddTranscript from './AddTranscript';
import AddFacDept from './AddFacDept';
import AddFacHistory from './AddFacHistory';
import CourseTable from '../tableComponents/CourseTable';
import AddPreReq from './AddPrereq';
import ReqTable from '../tableComponents/ReqTable';

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
            <Route exact path="/allCourses" component={CourseTable}></Route>
            <Route exact path="/majorRequirements" component={ReqTable}></Route>
            <Route exact path="/minorRequirements" component={ReqTable}></Route>


            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/addFacHistory" component={AddFacHistory} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/addFacHistory" component={AddFacHistory} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/addFacDept" component={AddFacDept} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/addFacDept" component={AddFacDept} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/AddTranscript" component={AddTranscript} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddTranscript" component={AddTranscript} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/addAdvising" component={AddAdvising} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/addAdvising" component={AddAdvising} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/editUser" component={EditUser} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/editUser" component={EditUser} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/editRoom" component={EditRoom} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/editRoom" component={EditRoom} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/editBuilding" component={EditBuilding} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/editBuilding" component={EditBuilding} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/editDP" component={EditDepartment} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/editDP" component={EditDepartment} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/AddMinorRequire" component={AddMinorRequirement} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddMinorRequire" component={AddMinorRequirement} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/AddMRequire" component={AddMRequirement} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddMRequire" component={AddMRequirement} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/addDepartment" component={AddDepartment} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/addDepartment" component={AddDepartment} allowed={false}></ProtectedRoute> 
            }
             {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/departments" component={Departments} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/departments" component={Departments} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/AddBuilding" component={addBuilding} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddBuilding" component={addBuilding} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/AddRoom" component={AddRoom} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddRoom" component={AddRoom} allowed={false}></ProtectedRoute> 
            }
             {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/buildAndRoom" component={BuildAndRoom} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/buildAndRoom" component={BuildAndRoom} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ? 
                <ProtectedRoute exact path ="/buildAndRoom" component={BuildAndRoom} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/buildAndRoom" component={BuildAndRoom} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ?
                <ProtectedRoute exact path ="/AddUser" component={AddUser} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddUser" component={AddUser} allowed={false}></ProtectedRoute> 
            }
             
              {
             
             (privs.isAdmin) ?
                <ProtectedRoute exact path ="/EditCourse" component={EditCourse} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/EditCourse" component={EditCourse} allowed={false}></ProtectedRoute> 
            }
            {
                (privs.isAdmin) ?
                <ProtectedRoute exact path ="/addPreReq" component={AddPreReq} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/addPreReq" component={AddPreReq} allowed={false}></ProtectedRoute> 
            }
                {
                (privs.isAdmin) ?
                <ProtectedRoute exact path ="/AddCourse" component={AddCourse} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddCourse" component={AddCourse} allowed={false}></ProtectedRoute> 
            }
             {
                (privs.isAdmin) ?
                <ProtectedRoute exact path ="/AddMinor" component={AddMinor} allowed={true}></ProtectedRoute> : 
                <ProtectedRoute exact path ="/AddMinor" component={AddMinor} allowed={false}></ProtectedRoute> 
                
            }
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
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/schedule" component={Schedule} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/schedule" component={Schedule} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isStudent || privs.isAdmin) ?
                    <ProtectedRoute exact path="/transcript" component={Transcript} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/transcript" component={Transcript} allowed={false}></ProtectedRoute>
            }

            {
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
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
                (privs.isStudent || privs.isAdmin || privs.isFaculty) ?
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
                (privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/addMeeting" component={AddMeeting} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/addMeeting" component={AddMeeting} allowed={false}></ProtectedRoute> 
            }

            {
                (privs.isAdmin || privs.isFaculty) ?
                    <ProtectedRoute exact path="/classList" component={ClassListTable} allowed={true}></ProtectedRoute> :
                    <ProtectedRoute exact path="/classList" component={ClassListTable} allowed={false}></ProtectedRoute> 
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