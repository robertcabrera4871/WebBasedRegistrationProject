import { useHistory } from 'react-router';
import React from "react";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";



export default function EditUser(rowData){
    const row = rowData.location.state
    // console.log(row)

    var userData = { }
    var newRow = {
        userID: "",
        firstName: "",
        lastName: "",
        DOB: "",
        city: "",
        state: "",
        zipCode: "",
        address: "",
        email: "",
        password: "",
        status: "active", 
        //Student
        creditsEarned: "",
        yearLevel: "",
        studentType: "",
        yearOfEntrance: "",
        minCredit: "",
        maxCredit: "",
        //StudentGrad
        program: "",
        yearIn: "",
        qualifyingExam: "",
        thesisTitle: "",
        //Faculty
        rank: "",
        minCourse :"",
        maxCourse : "",
        //For LoginInfo only
        userType: ""
      }

    let history = useHistory();

    const [userInfo, setUserInfo] = useState([])
    const [loginInfo, setLoginInfo] = useState([])
    const [studentInfo, setStudentInfo] = useState([])
    const [gradInfo, setGradInfo] = useState([])
    const [facRank, setFacRank] = useState([])




    useEffect(() => {
        getUserData();
    },[])

        async function submitChanges(e){
            e.preventDefault();
            console.log(newRow)
            await trimWhiteSpace();
    
            // switch(row.userType){
            //     case "Undergrad Student": 
            //     await handleUndergrad(); break;
            //     case "Grad Student": 
            //     await handleGrad(); break;
            //     case "Faculty":
            //     await handleFaculty(); break;
            //     case "Admin": 
            //     await handleAdmin(); break;
            //     case "ResearchStaff": 
            //     await handleResearch(); break;
            // }
    
    }
    async function getUserData(){
        if(row.userType === 'Undergrad Student'){
            setStudentInfo(await dbUtil.getStudent(row.userID))
        } else if(row.userType === 'Grad Student'){
            setGradInfo(await dbUtil.getGrad(row.userID))
            setStudentInfo(await dbUtil.getStudent(row.userID))

        } else if(row.userType === 'Faculty')
        {
            setFacRank(await dbUtil.getFacRank(row.userID))

        }
            setLoginInfo(await dbUtil.getLoginInfo(row.userID))
            setUserInfo(await dbUtil.getUser(row.userID))
            
    }

    async function trimWhiteSpace(newRow){
        for(const property in newRow){
            newRow[property] = newRow[property].trim()
         }
    }

    async function handleResearch(){
        if(newRow.status !== "locked" || newRow.staus !== "active"){window.alert("status must be locked or active"); return("")}
        if(await dbUtil.updateUser(newRow)){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const rsResponse = await dbUtil.updateResearch(newRow)
        if(rsResponse.err){window.alert("Failed to Update: ResearchStaff"); return("")}
        history.push('/users')
    }

    async function handleFac(){
        if(newRow.status !== "locked" || newRow.staus !== "active"){window.alert("status must be locked or active"); return("")}
        if(await checkFacCourse()){return("")}
        if(await dbUtil.updateUser(newRow)){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const facRes = await dbUtil.updateFaculty(newRow);
        if(facRes.err){window.alert("Failed to Update: Faculty"); return("")}
        history.push('/users')
    }
     

    async function handleAdmin(){
        if(newRow.status !== "locked" || newRow.staus !== "active"){window.alert("status must be locked or active"); return("")}
        if(await dbUtil.updateUser(newRow)){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const adResponse = await dbUtil.updateAdmin(newRow)
        if(adResponse.err){window.alert("Failed to Update: Admin"); return("")}
        history.push('/users')    
    }

    async function handleUndergrad(){
        if(newRow.status !== "locked" || newRow.staus !== "active"){window.alert("status must be locked or active"); return("")}
        if(await dbUtil.updateUser(newRow)){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const stuRes = await dbUtil.updateStudent(newRow);
        if(stuRes.err){window.alert("Failed to Update: Student (Check number fields and dates) "); return("")}
        const gradRes = await dbUtil.updateUndergrad(newRow);
        if(gradRes.err){window.alert("Failed to Update: Undergraduate"); return("")}
        history.push('/users')
    }

    async function handleGrad(){
        if(newRow.status !== "locked" || newRow.staus !== "active"){window.alert("status must be locked or active"); return("")}
        if(await dbUtil.updateUser(newRow)){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const stuRes = await dbUtil.updateStudent(newRow);
        if(stuRes.err){window.alert("Failed to Update: Student (Check number fields and dates) "); return("")}
        const gradRes = await dbUtil.updateGrad(newRow);
        if(gradRes.err){window.alert("Failed to Update: Graduate"); return("")}
        history.push('/users')
    }


    async function checkFacCourse(){
        if(newRow.rank === "part" && newRow.minCourse <= newRow.maxCourse && newRow.maxCourse <= 2 ){
            return false
        }
        if(newRow.rank === "full" && newRow.minCourse <= newRow.maxCourse && newRow.maxCourse <= 4){
            return false
        }
        window.alert("Max Course for Parttime: 2 Max Course for Fulltime: 4")
        return(true)
    }





    if(userInfo.length > 0){
        userData = {
            ...gradInfo[0],
            ...studentInfo[0],
            ...facRank[0],
            ...userInfo[0],
            ...loginInfo[0]
        }
        newRow = {
            ...userData
        }
        for(const i in userData){
            userData.DOB = userData.DOB.substring(0, 10)
          }
    }

   


    

    return(<div id='align-center'>
       { row.userType !== "" &&
        <Form id="user-form">
        <h1 className="text-align">Editing {row.firstName}</h1>
    <Form.Group>
        <Row>
            <Col>
        <Form.Label>UserID</Form.Label>
        <Form.Control  placeholder ={userData.userID} disabled={true} ></Form.Control>
        <Form.Label>First Name</Form.Label>
        <Form.Control placeholder ={userData.firstName} onChange={e => newRow.firstName = e.target.value} ></Form.Control>
        <Form.Label>Last Name</Form.Label>
        <Form.Control placeholder ={userData.lastName} onChange={e => newRow.lastName = e.target.value} ></Form.Control>
        <Form.Label>DOB</Form.Label>
        <Form.Control placeholder ={userData.DOB} disabled={true} ></Form.Control>
        <Form.Label>City</Form.Label>
        <Form.Control placeholder ={userData.city}  onChange={e => newRow.city = e.target.value} ></Form.Control>
        </Col>
        <Col>
        <Form.Label>State</Form.Label>
        <Form.Control placeholder ={userData.state} onChange={e => newRow.state = e.target.value} ></Form.Control>
        <Form.Label>Zip Code</Form.Label>
        <Form.Control placeholder ={userData.zipCode} onChange={e => newRow.zipCode = e.target.value} ></Form.Control>
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder ={userData.address} onChange={e => newRow.address = e.target.value} ></Form.Control>
        <Form.Label>Email</Form.Label>
        <Form.Control placeholder ={userData.email} onChange={e => newRow.email = e.target.value} ></Form.Control>
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder ={userData.password} onChange={e => newRow.password = e.target.value} ></Form.Control>
        <Form.Label>Status</Form.Label>
        <Form.Control placeholder ={userData.status} onChange={e => newRow.status = e.target.value} ></Form.Control>
        </Col>
        
        <Col>
        {row.userType === 'Faculty' && <div>
        <Form.Label>Rank</Form.Label>
        <Form.Control placeholder ={userData.rank} disabled={true} ></Form.Control>
        <Form.Label>Min Courses</Form.Label>
        <Form.Control placeholder ={userData.minCourse} onChange={e => newRow.minCourse = e.target.value} ></Form.Control>
        <Form.Label>Max Courses</Form.Label>
        <Form.Control placeholder ={userData.maxCourse} onChange={e => newRow.maxCourse= e.target.value} ></Form.Control>
        </div>
        }
        {(row.userType === 'Undergrad Student' || row.userType === 'Grad Student' )&& <div>
        <Form.Label>Credits Earned</Form.Label>
        <Form.Control placeholder ={userData.creditsEarned} disabled={true} ></Form.Control>
        <Form.Label>Year Level</Form.Label>
        <Form.Control placeholder ={userData.yearLevel} onChange={e => newRow.yearLevel = e.target.value} ></Form.Control>
        <Form.Label>Year of Entrance</Form.Label>
        <Form.Control placeholder ={userData.yearOfEntrance} onChange={e => newRow.yearOfEntrance = e.target.value} ></Form.Control>
        </div>
        }
          </Col>    
            </Row>
            <Row>
        {row.userType ==='Grad Student' && 
        <div>
         <Form.Label>Program</Form.Label>
         <Form.Control placeholder ={userData.program} onChange={e => newRow.program = e.target.value} ></Form.Control>
         <Form.Label>Year In</Form.Label>
         <Form.Control placeholder ={userData.yearIn} onChange={e => newRow.yearIn = e.target.value} ></Form.Control>
         <Form.Label>Qualifying Exam</Form.Label>
         <Form.Control placeholder ={userData.qualifyingExam}onChange={e => newRow.qualifyingExam = e.target.value} ></Form.Control>
         <Form.Label>Thesis Title</Form.Label>
         <Form.Control placeholder ={userData.thesisTitle} onChange={e => newRow.thesisTitle = e.target.value} ></Form.Control>
         </div>
        }
        </Row>
      
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
    </Form.Group>
        </Form>}
    </div>
    )
}