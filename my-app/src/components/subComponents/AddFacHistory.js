import { useHistory } from "react-router";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function AddFacHistory(){
    let history = useHistory();
    
    const newRow = {
        CRN	: "",
        facultyID: history.location.state,
        semesterYearID: ""
    }

    async function submitChanges(e){
        e.preventDefault();
        if(await checkCRNsemester()){return("")}
        if(await checkEnrollment()){return("")}
        const res = await dbUtil.addFacHistory(newRow)
        if(!res.err){
            history.goBack()
        } else if(res.err){
            window.alert(res.err.sqlMessage)
        }
        console.log(res)
     }

     async function checkEnrollment(){
        const res = await dbUtil.checkAnyEnrollment(newRow.CRN)
        if(res.err){
            window.alert(res.err.sqlMessage)
            console.log(res)
            return true
        } else if(res.length !== 0){
            window.alert("There are students enrolled in this class still. Move them over to Transcript to continue")
            return true      
        }
        return false
     }

     async function checkCRNsemester(){
         const res = await dbUtil.checkCRNsemester(newRow);
         if(res.err){
             window.alert(res.err.sqlMessage)
             return true
         }else if(res[0]['COUNT(*)'] === 0){
            window.alert('No course section exists with that combination')
            return true
         }  
         return false
     }
     
     return(
        <Form id='align-center'>
            <h1 className='text-align'>Add History</h1>
            <Form.Group>
                <Form.Label>CRN</Form.Label>
                <Form.Control onChange={e => newRow.CRN = e.target.value}></Form.Control>
                <Form.Label>Semester Year ID</Form.Label>
                <Form.Control onChange={e => newRow.semesterYearID = e.target.value}></Form.Control>
                <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
            </Form.Group>
        </Form>
    )
}