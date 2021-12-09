import { useHistory } from "react-router";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function AddCourse(){
    let history = useHistory();

    const newCourse = {
        courseName: "",
        departmentID: "",
        credits: ""
    }

    function submitChanges(e){
        e.preventDefault();
        console.log(newCourse)
        for(const property in newCourse){
            if(`${newCourse[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return("")
            } 
         }
         dbUtil.addCourse(newCourse).then(data =>{
            if(data.err){
                window.alert(data.err.sqlMessage)
            }else if(data.affectedRows === 1){
                history.push('/undergradCatalog')
            }
        })
    }

    return(
        <Form id='align-center'>
            <h1 className='text-align'>Add Course</h1>
            <Form.Group>
                <Form.Label>Course Name</Form.Label>
                <Form.Control onChange={e => newCourse.courseName = e.target.value}></Form.Control>
                <Form.Label>DepartmentID</Form.Label>
                <Form.Control onChange={e => newCourse.departmentID = e.target.value}></Form.Control>
                <Form.Label>Credits</Form.Label>
                <Form.Control onChange={e => newCourse.credits = e.target.value}></Form.Control>
                <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
            </Form.Group>
        </Form>
    )
}