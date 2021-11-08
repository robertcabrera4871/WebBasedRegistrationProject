import ListGroup from 'react-bootstrap/ListGroup'


function Registration(){
    return(
     <ListGroup id="align-center">
     <ListGroup.Item action href="/schedule">
       My Schedule
     </ListGroup.Item>
     <ListGroup.Item action href="/transcript">
      My Transcript
     </ListGroup.Item>
     <ListGroup.Item action href="/addMajorMinor">
      Add Major/Minor
     </ListGroup.Item>
     <ListGroup.Item action href="/changeMajorMinor">
      Change Major/Minor
     </ListGroup.Item>
     <ListGroup.Item action href="/addClass">
      Add Classes
     </ListGroup.Item>
     <ListGroup.Item action href="/dropClass">
      Drop Classes
     </ListGroup.Item>
     <ListGroup.Item action href="/viewHolds">
      View Holds
     </ListGroup.Item>
     </ListGroup>
     );
}

export default Registration