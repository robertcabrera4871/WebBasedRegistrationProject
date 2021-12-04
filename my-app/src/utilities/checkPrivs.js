import {AES, enc} from 'crypto-js'

export default function checkPrivs(){

    var user = ""
     if(sessionStorage.getItem('user')){
    const decrypted = AES.decrypt(sessionStorage.getItem('user'), 'secret-key1')
     user = decrypted.toString(enc.Utf8);
     user = JSON.parse(user)
    }
    
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