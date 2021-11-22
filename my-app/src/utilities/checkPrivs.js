export default function checkPrivs(){


    var user = (JSON.parse(sessionStorage.getItem('user')))
    user = ( user ) ? user : "";
    var isAdmin = false;
    var isStudent = false;
    var isFaculty = false;
    var isResearch = false;
  
    switch(user.userType){
      case 'admin': isAdmin = true; break;
      case 'student': isStudent = true; break;
      case 'faculty': isFaculty = true; break;
      case 'research': isResearch = true; break;
      default: //is guest;
    }

    var priveleges = {
        'isAdmin': isAdmin,
        'isStudent': isStudent,
        'isFaculty': isFaculty,
        'isResearch': isResearch,
    }

    return priveleges

}