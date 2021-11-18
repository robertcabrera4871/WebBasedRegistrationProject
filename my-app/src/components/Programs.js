import React from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup"

function Programs(){

    const user = JSON.parse(sessionStorage.getItem('user'));
    var isAdmin = false;
    var isStudent = false;
  
    switch(user.userType){
      case 'admin': isAdmin = true; break;
      case 'student': isStudent = true; break;
      default: //is guest;
    }

    return(
      <ListGroup id="align-center">
     <ListGroup.Item action href="/undergradCatalog">
       Undergraduate Catalog (ALL)
     </ListGroup.Item>
     <ListGroup.Item action href="/gradCatalog" >
        Graduate Catalog (ALL)
     </ListGroup.Item>
     {(isStudent ||isAdmin) && <ListGroupItem action href="/modifyCatalog">
      Modify Course Catalog (A)
     </ListGroupItem>}
     </ListGroup>
    );
}

export default Programs