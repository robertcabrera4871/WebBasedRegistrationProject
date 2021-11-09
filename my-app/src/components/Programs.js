import React from "react";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup"

function Programs(){
    return(
      <ListGroup id="align-center">
     <ListGroup.Item action href="/undergradCatalog">
       Undergraduate Catalog (ALL)
     </ListGroup.Item>
     <ListGroup.Item action href="/gradCatalog" >
        Graduate Catalog (ALL)
     </ListGroup.Item>
     <ListGroupItem action href="/modifyCatalog">
       Modify Course Catalog (A)
     </ListGroupItem>
     </ListGroup>
    );
}

export default Programs