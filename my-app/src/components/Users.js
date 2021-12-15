//Faculty can only search for students
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import checkPrivs from "../utilities/checkPrivs";
import AllUsers from "./AllUsers";


export default function Users(){

    const privs = checkPrivs();

    return(
        <div>
             <AllUsers/>
        </div>
       
    
    );
}
