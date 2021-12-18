import checkPrivs from "../utilities/checkPrivs";
import decryptUser from "../utilities/decryptUser";
import MasterSchedule from "./MasterSchedule";

export default function TeachScedule(adminAccess){

    var user = decryptUser();
    let privs = checkPrivs();
    
    if(privs.isAdmin){user.userID = adminAccess.location.state}
    
    return(
        <MasterSchedule isTeach={user.userID}/>
    );
}
