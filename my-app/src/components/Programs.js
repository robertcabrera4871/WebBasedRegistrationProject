import React from "react";
import ListGroup from "react-bootstrap/ListGroup"
import checkPrivs from "../utilities/checkPrivs";

function Programs(){

  let privs = checkPrivs();

    return(
      <ListGroup id="align-center">
     <ListGroup.Item action href="/undergradCatalog">
       Undergraduate Catalog
     </ListGroup.Item>
     <ListGroup.Item action href="/gradCatalog" >
        Graduate Catalog 
     </ListGroup.Item>
     <ListGroup.Item action href="/allCourses" >
        All Courses 
     </ListGroup.Item>
     {privs.isAdmin && <ListGroup.Item action href="/departments" >
        Departments
     </ListGroup.Item> }
     
     </ListGroup>
    );
}

export default Programs