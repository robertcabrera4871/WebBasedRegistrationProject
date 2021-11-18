import ListGroup from 'react-bootstrap/ListGroup'



function Academics(){
    return(
        <ListGroup id="align-center">
        <ListGroup.Item action href="/advisors">
          My Advisors (S)
        </ListGroup.Item>
        <ListGroup.Item action href="/advisees">
          My Advisees (F)
        </ListGroup.Item>
        <ListGroup.Item action href="/degreeAudit">
          Degree Progress (S)
        </ListGroup.Item>
        <ListGroup.Item action href="/teachSchedule">
          Teaching Schedule (F)
        </ListGroup.Item>
        </ListGroup>
        );
}

export default Academics