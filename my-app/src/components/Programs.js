import React from "react";
import ListGroup from "react-bootstrap/ListGroup"

function Programs(){

    return(
      <ListGroup id="align-center">
     <ListGroup.Item action href="/undergradCatalog">
       Undergraduate Catalog
     </ListGroup.Item>
     <ListGroup.Item action href="/gradCatalog" >
        Graduate Catalog 
     </ListGroup.Item>
     </ListGroup>
    );
}

export default Programs