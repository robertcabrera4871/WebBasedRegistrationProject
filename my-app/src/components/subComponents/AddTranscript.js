import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';
import timeWindow from "../../utilities/timeWindow";
import funcs from "../../utilities/timeWindowFunc";
import checkPrivs from "../../utilities/checkPrivs";

export default function AddTranscript(adminAccess){

var adminUser = adminAccess.location.state
let history = useHistory();
const grades = ['A', 'B', 'C', 'D', 'F', 'IP'];
let privs = checkPrivs();


const newRow = {
        CRN: "",
        studentID: adminUser,
        semesterYearID:"",
        grade:"",
    }

    async function submitChanges(e){
        e.preventDefault();
        if(!grades.includes(newRow.grade)){
            window.alert(`Valid entries for grade are ${grades}`)
            return("")
        }
        if(await checkSemesterYear(newRow.semesterYearID, newRow.CRN)){return("")}
        const checkEnrolled = await dbUtil.checkEnrollment(adminUser, newRow.CRN)
        if(checkEnrolled.length !== 0){
            if(window.confirm("Student is enrolled. Would you like to transfer to Transcript?"))
            {
                const check = await timeWindow(funcs.finalExams, false)
                if(!check){
                    if(window.confirm("You are not within the time window for assigning final grades. Are you sure you wish to conitinue?")){
                       if(await deleteAttendance()){window.alert("Deltetion from Attendance Failed"); return("")}
                       if(await deleteEnroll(newRow.CRN, adminUser)){return("")}
                       if(await addHistory()){window.alert("Insertion to Student History Failed"); return("") }
                       history.goBack();
                    }
                }else{
                    if(await deleteAttendance()){window.alert("Deltetion from Attendance Failed"); return("")}
                    if(await deleteEnroll(newRow.CRN, adminUser)){return("")}
                    if(await addHistory()){window.alert("Insertion to Student History Failed"); return("") }
                    history.goBack();
                }
        
            }
        }else{
            window.alert("That CRN does not exist OR you are not enrolled")
        }
    
        
    }

    async function deleteEnroll(CRN, userID){
        const res = await dbUtil.dropMyClass(CRN, userID)
        if(res.err){
            window.alert(res.sqlMessage)
            console.log(res)
            return true
        }
        return false
    }

    async function checkSemesterYear(semesterID, CRN){
        const check = await dbUtil.checkSemID(semesterID, CRN)
        if(check.err){
            window.alert(check.err.sqlMessage)
            console.log(check)
            return true
        }else if(check.length === 0){
            window.alert("Incorrect semestear year ID for that CRN")
            return true
        }   
        return false
    }

    async function deleteAttendance(){
        const res = await dbUtil.deleteAttendenceByID(adminUser)
        if(res.err){
            window.alert(res.err.sqlMessage)
            console.log(res)
            return true
        }
        return false
    }

    async function addHistory(){
        const res = await dbUtil.addStudentHistory(newRow)
        if(res.err){
            window.alert(res.err.sqlMessage)
            console.log(res)
            return true
        }
        return false
    }

    return(
        <Form id='align-center'>
        <h1 className="text-align">New Transcript Entry</h1>
    <Form.Group>
        <Form.Label>CRN</Form.Label>
        <Form.Control onChange={e => newRow.CRN = e.target.value} ></Form.Control>
        <Form.Label>Semester</Form.Label>
        <Form.Control onChange={e => newRow.semesterYearID = e.target.value} ></Form.Control>
        <Form.Label>Grade</Form.Label>
        <Form.Control onChange={e => newRow.grade = e.target.value} ></Form.Control>
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
     </Form.Group>
    </Form>
    )   
}