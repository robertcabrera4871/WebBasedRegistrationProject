import decryptUser from "../utilities/decryptUser";
import MasterSchedule from "./MasterSchedule";

export default function TeachScedule(){

    var user = decryptUser();

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
