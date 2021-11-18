import ListGroup from 'react-bootstrap/ListGroup'
import checkPrivs from '../utilities/checkPrivs';

const privs = checkPrivs();

function Academics(){
    return(
        <ListGroup id="align-center">
        {(privs.isStudent || privs.isAdmin) && 
         <ListGroup.Item action href="/advisors">
          My Advisors (S)
        </ListGroup.Item>}
        {(privs.isFaculty || privs.isAdmin) && 
        <ListGroup.Item action href="/advisees">
          My Advisees (F)
        </ListGroup.Item>}
        {(privs.isStudent || privs.isAdmin) && 
        <ListGroup.Item action href="/degreeAudit">
          Degree Progress (S)
        </ListGroup.Item>}
        {(privs.isFaculty || privs.isAdmin) && 
        <ListGroup.Item action href="/teachSchedule">
          Teaching Schedule (F)
        </ListGroup.Item>}
        </ListGroup>
        );
}

export default Academics