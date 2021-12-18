import { useHistory } from "react-router";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


export default function AddPreReq(){
    let history = useHistory();
    const grades = ['A', 'B', 'C', 'D', 'E', 'F', 'IP'];

    const newCourse = {
        courseID: history.location.state,
        prereqCourseID: "",
        gradeReq: ""
    }

    async function submitChanges(e){
        e.preventDefault();
        if(await checkGrades()){return("")}
        if(await checkReveseReq()){return("")}
        if(await checkBlanks()){return("")}
        await addPreReq();

    }

    async function addPreReq(){
        const res = await dbUtil.addPreReq(newCourse);
        if(res.err){
            window.alert(res.err.sqlMessage)
            console.log(res)
        }else if(res.affectedRows === 1){
            window.alert("Prequisite added succesfully")
            history.goBack();
        }
    
  
    }

    async function checkReveseReq(){
        const res = await dbUtil.checkReveseReq(newCourse)
        if(res.err){
            window.alert(res.err.sqlMessage)
            console.log(res)
            return true
        }else if(res.length !== 0){
            window.alert("Prereq cannot be a prereq to a prereq")
            return true
        }
        return false
    } 

    async function checkBlanks(){
        for(const property in newCourse){
            if(`${newCourse[property].trim()}` === ""){
                window.alert("Please ensure no fields are left empty");
                return true
            } 
         }
         return false
    }

    async function checkGrades(){
        if(!grades.includes(newCourse.gradeReq)){
           window.alert(`Valid entries are ${grades}`)
           return true
       }
       return false
    }

    return(
        <Form id='align-center'>
            <h1 className='text-align'>Add Prerequisite for {history.location.state}</h1>
            <Form.Group>
                <Form.Label>Course ID</Form.Label>
                <Form.Control onChange={e => newCourse.prereqCourseID = e.target.value}></Form.Control>
                <Form.Label>Grade Required</Form.Label>
                <Form.Control onChange={e => newCourse.gradeReq = e.target.value}></Form.Control>
                <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
            </Form.Group>
        </Form>
    )
}