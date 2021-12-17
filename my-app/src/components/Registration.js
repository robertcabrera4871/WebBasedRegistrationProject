import ListGroup from 'react-bootstrap/ListGroup'
import checkPrivs from '../utilities/checkPrivs';
import decryptUser from '../utilities/decryptUser';

const privs = checkPrivs();

function Registration(){
    return(
     <ListGroup id="align-center">
     {(privs.isStudent || privs.isAdmin) && <ListGroup.Item action href="/schedule">
       My Schedule
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) && <ListGroup.Item action href="/transcript">
      My Transcript
     </ListGroup.Item>}
     { (privs.isStudent || privs.isAdmin) && <ListGroup.Item action href="/addMajorMinor">
      My Major/Minors
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) &&<ListGroup.Item action href="/addClass">
      Add Classes 
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) &&<ListGroup.Item action href="/dropClass">
      Drop Classes
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) &&<ListGroup.Item action href="/viewHolds">
      View Holds
     </ListGroup.Item>}
     </ListGroup>
     );
}

export default Registration