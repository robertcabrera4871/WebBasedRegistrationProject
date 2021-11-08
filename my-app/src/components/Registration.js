import ListGroup from 'react-bootstrap/ListGroup'


function Registration(){
    return(
        // <div>
        // <a href="/schedule">View Detail Schedule</a>
        // <a href="/transcript">View Detail Schedule</a>
        // </div>
     <div id="align-center">
     <ListGroup>
     <ListGroup.Item action href="/schedule">
       My Schedule
     </ListGroup.Item>
     <ListGroup.Item action href="/transcript">
      My Transcript
     </ListGroup.Item>
     </ListGroup>
     </div>
     );
}

export default Registration