import ListGroup from 'react-bootstrap/ListGroup'
import checkPrivs from '../utilities/checkPrivs';

const privs = checkPrivs();

function Registration(){
    return(
     <ListGroup id="align-center">
     {(privs.isStudent || privs.isAdmin) && <ListGroup.Item action href="/schedule">
       My Schedule (S)
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) && <ListGroup.Item action href="/transcript">
      My Transcript (S)
     </ListGroup.Item>}
     {privs.isAdmin && <ListGroup.Item action href="/addMajorMinor">
      Add Major/Minor (A)
     </ListGroup.Item>}
     {privs.isAdmin && <ListGroup.Item action href="/changeMajorMinor">
      Change Major/Minor (A)
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) &&<ListGroup.Item action href="/addClass">
      Add Classes (S)
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) &&<ListGroup.Item action href="/dropClass">
      Drop Classes (S)
     </ListGroup.Item>}
     {(privs.isStudent || privs.isAdmin) &&<ListGroup.Item action href="/viewHolds">
      View Holds (S)
     </ListGroup.Item>}
     </ListGroup>
     );
}

export default Registration