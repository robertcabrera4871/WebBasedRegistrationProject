import ListGroup from 'react-bootstrap/ListGroup'

function Academics(){
    return(
        <ListGroup id="align-center">
        <ListGroup.Item action href="/advisors">
          My Advisors
        </ListGroup.Item>
        <ListGroup.Item action href="/degreeAudit">
          Degree Progress
        </ListGroup.Item>
        </ListGroup>
        );
}

export default Academics