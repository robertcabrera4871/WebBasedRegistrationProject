import { useHistory } from "react-router";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function AddDepartment(){

    let history = useHistory();

    const newDep = {
        departmentID: "",
        roomID: "",
        dEmail: "",
        dPhone: "",
        dChair: "",
        dManager: ""
    }


    async function submitChanges(e){
        e.preventDefault();
        if (await checkBlanks() === "" ){return("")}
        await AddDepartment();
        
    }

    async function checkBlanks(){
        for(const property in newDep){
            if(`${newDep[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
    }

    async function AddDepartment(){
        const response = await dbUtil.AddDepartment(newDep)
            if(response.err){
                window.alert(response.err.sqlMessage)
                return("")
            } else{
                history.push('/departments')
            }
        }

        return(
            <Form id='align-center'>
            <h1 className="text-align">New Department</h1>
        <Form.Group>
            <Form.Label>Department Name</Form.Label>
            <Form.Control onChange={e => newDep.departmentID = e.target.value} ></Form.Control>
            <Form.Label>RoomID</Form.Label>
            <Form.Control onChange={e => newDep.roomID = e.target.value}></Form.Control>
            <Form.Label>Department Email</Form.Label>
            <Form.Control onChange={e => newDep.dEmail = e.target.value} ></Form.Control>
            <Form.Label>Department Phone</Form.Label>
            <Form.Control onChange={e => newDep.dPhone = e.target.value} ></Form.Control>
            <Form.Label>Department Chair</Form.Label>
            <Form.Control onChange={e => newDep.dChair = e.target.value} ></Form.Control>
            <Form.Label>Department Manager</Form.Label>
            <Form.Control onChange={e => newDep.dManager= e.target.value} ></Form.Control>
            <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
         </Form.Group>
        </Form>
        )

}