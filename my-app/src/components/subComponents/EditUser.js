import { useHistory } from 'react-router';
import React from "react";
import dbUtil from "../../utilities/dbUtil";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";


//NEEDS TO ABILITY TO SWITCH BETWEEN PART AND FULL
export default function EditUser(rowData){
    const row = rowData.location.state
    // console.log(row)

    const yearLevels = ['freshman', 'sophmore','junior','senior']

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
        status: "", 
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
    const [minMax, setMinMax] = useState([])
    const [minMaxCred, setMinMaxCred] = useState([])




    useEffect(() => {
        getUserData();
    },[])

        async function submitChanges(e){
            e.preventDefault();
            console.log(newRow)
            await trimWhiteSpace();
    
            switch(row.userType){
                case "Undergrad Student": 
                await handleUndergrad(); break;
                case "Grad Student": 
                await handleGrad(); break;
                case "Faculty":
                await handleFaculty(); break;
                case "Admin": 
                await handleAdmin(); break;
                case "ResearchStaff": 
                await handleResearch(); break;
            }
    
    }
    async function getUserData(){
        if(row.userType === 'Undergrad Student'){
            const test = await dbUtil.creditCheck(row.userID)
            setMinMaxCred(test)
            setStudentInfo(await dbUtil.getStudent(row.userID))
        } else if(row.userType === 'Grad Student'){
            setGradInfo(await dbUtil.getGrad(row.userID))
            setMinMaxCred(await dbUtil.creditCheck(row.userID))
            setStudentInfo(await dbUtil.getStudent(row.userID))

        } else if(row.userType === 'Faculty')
        {   
            const tempRank = await dbUtil.getFacRank(row.userID)
            setFacRank(tempRank)
            if(tempRank[0]?.rank === 'full'){
                setMinMax(await dbUtil.getMinMaxFac(row, 'FulltimeFac'))
            }else if(tempRank[0]?.rank === 'part'){
                setMinMax(await dbUtil.getMinMaxFac(row, 'PartTimeFac'))

            }

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
        if(!(newRow.status !== "locked" || newRow.status !== "active")){window.alert("status must be locked or active"); return("")}
        const useRes = await dbUtil.updateUser(newRow)
        if(useRes.err){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const rsResponse = await dbUtil.updateResearch(newRow)
        console.log(rsResponse)
        if(rsResponse.err){window.alert("Failed to Update: ResearchStaff"); return("")}
        history.push('/users')
    }

    async function handleFaculty(){
        if(!(newRow.status !== "locked" || newRow.status !== "active")){window.alert("status must be locked or active"); return("")}
        const res = await checkFacCourse();
        if(await checkFacCourse()){return("")}
        const useRes = await dbUtil.updateUser(newRow)
        if(useRes.err){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const fullPart = await dbUtil.updateFullPartFac(newRow);
        console.log(fullPart.err)
        if(newRow.rank !== 'other'){
        if(fullPart.err){window.alert(`Failed to Update: ${newRow.rank}time Faculty`); return("")}}
        history.push('/users')
    }
     

    async function handleAdmin(){
        if(!(newRow.status !== "locked" || newRow.status !== "active")){window.alert("status must be locked or active"); return("")}
        if(await dbUtil.updateUser(newRow)){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const adResponse = await dbUtil.updateAdmin(newRow)
        if(adResponse.err){window.alert("Failed to Update: Admin"); return("")}
        history.push('/users')    
    }

    async function handleUndergrad(){
        if(!yearLevels.includes(newRow.yearLevel.toLowerCase())){window.alert(`Valid year level: ${yearLevels}`); return("")}
        if(!(newRow.status !== "locked" || newRow.status !== "active")){window.alert("status must be locked or active"); return("")}
        const useRes = await dbUtil.updateUser(newRow)
        if(useRes.err){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const stuRes = await dbUtil.updateStudent(newRow);
        console.log(stuRes)
        if(stuRes.err){window.alert("Failed to Update: Student (Check number fields and dates) "); return("")}
        const gradRes = await dbUtil.updateUndergrad(newRow);
        if(gradRes.err){window.alert("Failed to Update: Undergraduate"); return("")}
        history.push('/users')
    }

    async function handleGrad(){
        if(!(newRow.status !== "locked" || newRow.status !== "active")){window.alert("status must be locked or active"); return("")}
        const useRes = await dbUtil.updateUser(newRow)
        if(useRes.err){window.alert("Failed to Update user"); return("")};
        const loginRes = await dbUtil.updateLogin(newRow);
        if(loginRes.err){window.alert("Failed to Update: LoginInfo Email taken"); return("")}
        const stuRes = await dbUtil.updateStudent(newRow);
        if(stuRes.err){window.alert("Failed to Update: Student (Check number fields and dates) "); return("")}
        const gradRes = await dbUtil.updateGrad(newRow);
        console.log(gradRes)
        if(gradRes.err){window.alert("Failed to Update: Graduate"); return("")}
        history.push('/users')
    }


    async function checkFacCourse(){
        if(newRow.rank === "other"){
            return false
        }
        if(newRow.rank === "part" && newRow.minCourse <= newRow.maxCourse && newRow.maxCourse <= 2 && 
        newRow.minCourse >= 0){
            return false
        }
        if(newRow.rank === "full" && newRow.minCourse <= newRow.maxCourse && 
        newRow.maxCourse <= 4 && newRow.maxCourse > 2 && newRow.minCourse >= 0){
            return false
        }
        window.alert("Max Course for Parttime: 2 Max Course for Fulltime: 4 Min Course: 0")
        return true
    }

    if(userInfo.length > 0){
        userData = {
            ...gradInfo[0],
            ...studentInfo[0],
            ...facRank[0],
            ...loginInfo[0],
            ...userInfo[0],
            ...minMax[0],
            ...minMaxCred[0]
        }
        newRow = {
            ...userData
        }
        for(const i in userData){
            newRow.DOB = newRow.DOB.substring(0, 10)
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
        <Form.Control placeholder ={userData.minCourse} disabled={newRow.rank === "other"} onChange={e => newRow.minCourse = e.target.value} ></Form.Control>
        <Form.Label>Max Courses</Form.Label>
        <Form.Control placeholder ={userData.maxCourse} disabled={newRow.rank === "other"} onChange={e => newRow.maxCourse= e.target.value} ></Form.Control>
        </div>
        }
        {(row.userType === 'Undergrad Student' || row.userType === 'Grad Student' )&& <div>
        <Form.Label>Credits Earned</Form.Label>
        <Form.Control placeholder ={userData.creditsEarned} disabled={true} ></Form.Control>
        <Form.Label>Year Level</Form.Label>
        <Form.Control placeholder ={userData.yearLevel} onChange={e => newRow.yearLevel = e.target.value} ></Form.Control>
        <Form.Label>Year of Entrance</Form.Label>
        <Form.Control placeholder ={userData.yearOfEntrance} onChange={e => newRow.yearOfEntrance = e.target.value} ></Form.Control>
        <Form.Label>Min Credit</Form.Label>
        <Form.Control placeholder ={userData.minCredit} disabled={true} ></Form.Control>
        <Form.Label>Max Credit</Form.Label>
        <Form.Control placeholder ={userData.maxCredit} disabled={true} ></Form.Control>
        
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