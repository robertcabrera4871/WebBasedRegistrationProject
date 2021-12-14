import checkPrivs from "../utilities/checkPrivs";
import decryptUser from "../utilities/decryptUser";
import MasterSchedule from "./MasterSchedule";

export default function TeachScedule(adminAccess){

    var user = decryptUser();
    let privs = checkPrivs();
    
    if(privs.isAdmin){user.userID = adminAccess.location.state}
    
    return(
    // <div>TeachScedule Page
    //     <h3>Add Class Lists</h3>
    //     <h3>Add Attendence</h3>
    //     <h3>Add Grading</h3>
    //     <h3>Add Change Grading</h3>
        <MasterSchedule isTeach={user.userID}/>
    // </div>
    
    );
}
