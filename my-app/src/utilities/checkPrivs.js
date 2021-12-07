import decryptUser from './decryptUser';

export default function checkPrivs(){

    var user = decryptUser();
    
    user = ( user ) ? user : "";
    
    var isAdmin = false;
    var isStudent = false;
    var isFaculty = false;
    var isResearch = false;
    var isGuest = false;
  
    switch(user.userType){
      case 'admin': isAdmin = true; break;
      case 'student': isStudent = true; break;
      case 'faculty': isFaculty = true; break;
      case 'research': isResearch = true; break;
      case 'guest': isGuest = true; break;
      default:
    }

    var priveleges = {
        'isAdmin': isAdmin,
        'isStudent': isStudent,
        'isFaculty': isFaculty,
        'isResearch': isResearch,
        'isGuest': isGuest,
    }
    return priveleges

}