import ListGroup from 'react-bootstrap/ListGroup'
import checkPrivs from '../utilities/checkPrivs';

const privs = checkPrivs();

function Academics(){
    return(
        <ListGroup id="align-center">
        {(privs.isStudent) && 
         <ListGroup.Item action href="/advisors">
          My Advisors 
        </ListGroup.Item>}
        {(privs.isFaculty) && 
        <ListGroup.Item action href="/advisees">
          My Advisees 
        </ListGroup.Item>}
        {(privs.isStudent) && 
        <ListGroup.Item action href="/degreeAudit">
          Degree Progress
        </ListGroup.Item>}
        {(privs.isFaculty) && 
        <ListGroup.Item action href="/teachSchedule">
          Teaching Schedule
        </ListGroup.Item>}
        </ListGroup>
        );
}

export default Academics