import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import React, { useState, useEffect } from "react";


export default function AddUser(chosenType){
    const userChosen = chosenType.location.state
    let history = useHistory()


    const yearLevels = ['freshman', 'sophmore','junior','senior']

    const newRow = {
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

    newRow.studentType = userChosen;


    async function submitChanges(e){
        e.preventDefault();
        await trimWhiteSpace();

        switch(userChosen){
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

    async function handleResearch(){
        newRow.userType="research";
        if(await checkBlanksDefault()){return("")}
        const userRes = await dbUtil.createUser(newRow);
        if(userRes?.err?.code === "ER_DUP_ENTRY"){window.alert("Duplicate userID OR First/Last name"); return("")}
        if(userRes.err){window.alert("Failed to Insert: User (Check number fields and dates)"); return("")}
        const loginRes = await dbUtil.createLogin(newRow);
        if(loginRes.err){window.alert("Failed to Insert: LoginInfo  Email taken"); return(reverseChanges())}
        const rsResponse = await dbUtil.createResearch(newRow)
        if(rsResponse.err){window.alert("Failed to Insert: ResearchStaff"); return(reverseChanges())}
        history.push('/users')
    }
    async function handleAdmin(){
        newRow.userType="admin";
        if(await checkBlanksDefault()){return("")}
        const userRes = await dbUtil.createUser(newRow);
        if(userRes?.err?.code === "ER_DUP_ENTRY"){window.alert("Duplicate userID OR First/Last name"); return("")}
        if(userRes.err){window.alert("Failed to Insert: User (Check number fields and dates)"); return("")}
        const loginRes = await dbUtil.createLogin(newRow);
        if(loginRes.err){window.alert("Failed to Insert: LoginInfo  Email taken"); return(reverseChanges())}
        const adResponse = await dbUtil.createAdmin(newRow)
        if(adResponse.err){window.alert("Failed to Insert: Admin"); return(reverseChanges())}
        history.push('/users')
      
    }

    async function handleUndergrad(){
        var fullRes = ""
        newRow.userType="student";
        if(!yearLevels.includes(newRow.yearLevel.toLowerCase())){window.alert(`Valid year level: ${yearLevels}`); return("")}
        if(await checkBlanksUndergrad()){return("")}
        const checkTime = await checkFullOrPart();
        if(checkTime === ""){return("")}
        const userRes = await dbUtil.createUser(newRow);
        if(userRes?.err?.code === "ER_DUP_ENTRY"){window.alert("Duplicate userID OR First/Last name"); return("")}
        if(userRes.err){window.alert("Failed to Insert: User (Check number fields and dates)"); return("")}
        const loginRes = await dbUtil.createLogin(newRow);
        if(loginRes.err){window.alert("Failed to Insert: LoginInfo  Email taken"); return(reverseChanges())}
        const stuRes = await dbUtil.createStudent(newRow);
        if(stuRes.err){window.alert("Failed to Insert: Student (Check number fields and dates) "); return(reverseChanges())}
        const gradRes = await dbUtil.createUndergrad(newRow);
        if(gradRes.err){window.alert("Failed to Insert: Undergraduate"); return(reverseChanges())}

        if(checkTime === "full")
        {
           fullRes = await dbUtil.createFullUndergrad(newRow)
           if(fullRes.err){window.alert("Failed to Insert: Full Undergraduate"); return(reverseChanges())}
        } else if(checkTime === "part"){
           fullRes = await dbUtil.createPartUndergrad(newRow)
           console.log(fullRes)
           if(fullRes.err){window.alert("Failed to Insert: Part Undergraduate"); return(reverseChanges())}
        } else {return("")}
        history.push('/users')
   

    }

    async function handleGrad(){
        var fullRes = ""
        newRow.userType="student";
        newRow.yearLevel="grad";
        if(await checkBlanksGrad()){return("")}
        const checkTime = await checkFullOrPart();
        if(checkTime === ""){return("")}
        const userRes = await dbUtil.createUser(newRow);
        if(userRes?.err?.code === "ER_DUP_ENTRY"){window.alert("Duplicate userID OR First/Last name"); return("")}
        if(userRes.err){window.alert("Failed to Insert: User (Check number fields and dates)"); return("")}
        const loginRes = await dbUtil.createLogin(newRow);
        if(loginRes.err){window.alert("Failed to Insert: LoginInfo Email taken"); return(reverseChanges())}
        const stuRes = await dbUtil.createStudent(newRow);
        console.log(stuRes)
        if(stuRes.err){window.alert("Failed to Insert: Student (Check number fields and dates)"); return(reverseChanges())}
        const gradRes = await dbUtil.createGrad(newRow);
        console.log(gradRes)
        if(gradRes.err){window.alert("Failed to Insert: Graduate (Check number fields)"); return(reverseChanges())}
      

        if(checkTime === "full")
        {
           fullRes = await dbUtil.createFullGrad(newRow)
           if(fullRes.err){window.alert("Failed to Insert: Full Undergraduate"); return(reverseChanges())}

        } else if(checkTime === "part"){
           fullRes = await dbUtil.createPartGrad(newRow)
           if(fullRes.err){window.alert("Failed to Insert: Full Undergraduate"); return(reverseChanges())}
        } 
        history.push('/users')


    }

    async function handleFaculty(){
        newRow.userType="faculty";
        const checkTime = await checkFullOrPartFac();
        if(checkTime === 'other'){
            window.alert("User will not have login info or min max courses")
        }
        if(await checkBlanksFac()){return("")}
        
        const userRes = await dbUtil.createUser(newRow);
        if(userRes?.err?.code === "ER_DUP_ENTRY"){window.alert("Duplicate userID OR First/Last name"); return("")}
        if(userRes.err){window.alert("Failed to Insert: User (Check number fields and dates)"); return("")}
        if(checkTime !== 'other'){
        const loginRes = await dbUtil.createLogin(newRow);
        if(loginRes.err){window.alert("Failed to Insert: LoginInfo Email Password combo taken"); return(reverseChanges())}}
      
        const facResponse = await dbUtil.createFaculty(newRow)
        if(facResponse.err){window.alert(`Failed to Insert: Faculty, (Check number fields and dates)`); return(reverseChanges())}

        if(checkTime !== "other"){
        const fullRes = await dbUtil.createFullPartFac(newRow, checkTime)
        if(fullRes.err){window.alert(`Failed to Insert: ${checkTime}time Faculty, (Check number fields and dates)`); return(reverseChanges())}}
        history.push('/users')

    }


    

    async function reverseChanges(){
        const response = await dbUtil.deleteUser(newRow.userID)
        if(response.err){
            window.alert(response.err.sqlMesssage)
            console.log(response)
        }else if(!response.err){
            console.log("User deleted")
        }
        return("")
    }
    async function checkFullOrPartFac(){
        if(newRow.rank === 'other'){
            newRow.minCourse = 0
            newRow.maxCourse = 0
            return "other"
        }

        if(newRow.rank === "part" && newRow.minCourse <= newRow.maxCourse && newRow.maxCourse <= 2 && 
        newRow.minCourse >= 0){
            return "part"
        }
        if(newRow.rank === "full" && newRow.minCourse <= newRow.maxCourse && 
        newRow.maxCourse <= 4 && newRow.maxCourse > 2 && newRow.minCourse >= 0){
            return "full"
        }
      window.alert("Valid Ranks: full / part / other Max Course for Part: 2 Max Course for Full: 4")
      return("")

    }
    async function checkFullOrPart(){
        if(newRow.minCredit === "0" && newRow.maxCredit === "9"){
            return "part"
        }
        if(newRow.minCredit === "9" && newRow.maxCredit === "15"){
            return "full"
        }
      window.alert("Valid Min: 0/9 Valid Max: 9/15")
      return("")

    }

   

    async function checkBlanksDefault(){
        if(newRow.userID === '' || newRow.firstName  === '' || newRow.lastName === '' ||
        newRow.DOB === '' || newRow.city  === '' || newRow.state  === '' || 
        newRow.zipCode === '' || newRow.address  === '' || newRow.email  === '' ||
       newRow.password  === ''){
           window.alert('Please ensure no blank spaces')
           return true
       } 
       return false
    }
    async function checkBlanksFac(){
        if(newRow.userID === '' || newRow.firstName  === '' || newRow.lastName === '' ||
        newRow.DOB === '' || newRow.city  === '' || newRow.state  === '' || 
        newRow.zipCode === '' || newRow.address  === '' || newRow.email  === '' ||
       newRow.password  === '' || newRow.rank === ''){
           window.alert('Please ensure no blank spaces')
           return true
       } 
       return false
    }
    async function checkBlanksUndergrad(){

        if(newRow.userID === '' || newRow.firstName  === '' || newRow.lastName === '' ||
         newRow.DOB === '' || newRow.city  === '' || newRow.state  === '' || 
         newRow.zipCode === '' || newRow.address  === '' || newRow.email  === '' ||
        newRow.password  === '' ||newRow.creditsEarned  === '' ||newRow.yearLevel  === '' ||
        newRow.studentType  === '' || newRow.yearOfEntrance === ''){
            window.alert('Please ensure no blank spaces')
            return true
        } 
        return false
    }
    async function checkBlanksGrad(){
        if(newRow.userID === '' || newRow.firstName  === '' || newRow.lastName === '' ||
         newRow.DOB === '' || newRow.city  === '' || newRow.state  === '' || 
         newRow.zipCode === '' || newRow.address  === '' || newRow.email  === '' ||
        newRow.password  === '' ||newRow.creditsEarned  === '' ||newRow.yearLevel  === '' ||
        newRow.studentType  === '' || newRow.yearOfEntrance === '' || newRow.program === '' || 
        newRow.yearIn === '' ||  newRow.qualifyingExam === '' || newRow.thesisTitle === '' ){
            window.alert('Please ensure no blank spaces')
            return true
        } 
        return false
    }
    async function trimWhiteSpace(newRow){
        for(const property in newRow){
            newRow[property] = newRow[property].trim()
         }
    }




    return(
        <div id='align-center'>
        { userChosen !== "" &&
        <Form id="user-form">
        <h1 className="text-align">New {userChosen}</h1>
    <Form.Group>
        <Row>
            <Col>
        <Form.Label>UserID</Form.Label>
        <Form.Control onChange={e => newRow.userID = e.target.value} ></Form.Control>
        <Form.Label>First Name</Form.Label>
        <Form.Control onChange={e => newRow.firstName = e.target.value} ></Form.Control>
        <Form.Label>Last Name</Form.Label>
        <Form.Control onChange={e => newRow.lastName = e.target.value} ></Form.Control>
        <Form.Label>DOB</Form.Label>
        <Form.Control placeholder={"YYYY-MM-DD"}onChange={e => newRow.DOB = e.target.value} ></Form.Control>
        <Form.Label>City</Form.Label>
        <Form.Control onChange={e => newRow.city = e.target.value} ></Form.Control>
        </Col>
        <Col>
        <Form.Label>State</Form.Label>
        <Form.Control onChange={e => newRow.state = e.target.value} ></Form.Control>
        <Form.Label>Zip Code</Form.Label>
        <Form.Control onChange={e => newRow.zipCode = e.target.value} ></Form.Control>
        <Form.Label>Address</Form.Label>
        <Form.Control onChange={e => newRow.address = e.target.value} ></Form.Control>
        <Form.Label>Email</Form.Label>
        <Form.Control onChange={e => newRow.email = e.target.value} ></Form.Control>
        <Form.Label>Password</Form.Label>
        <Form.Control onChange={e => newRow.password = e.target.value} ></Form.Control>
        </Col>
        <Col>
        {userChosen === 'Faculty' && <div>
        <Form.Label>Rank</Form.Label>
        <Form.Control onChange={e => newRow.rank = e.target.value} ></Form.Control>
        <Form.Label>Min Courses</Form.Label>
        <Form.Control onChange={e => newRow.minCourse = e.target.value} ></Form.Control>
        <Form.Label>Max Courses</Form.Label>
        <Form.Control onChange={e => newRow.maxCourse= e.target.value} ></Form.Control>
        </div>
        }
        {
        (userChosen === 'Undergrad Student') && <div>
        <Form.Label>Year Level</Form.Label>
        <Form.Control onChange={e => newRow.yearLevel = e.target.value} ></Form.Control></div>
        }
        {(userChosen === 'Undergrad Student' || userChosen === 'Grad Student' )&& <div>
        <Form.Label>Credits Earned</Form.Label>
        <Form.Control onChange={e => newRow.creditsEarned = e.target.value} ></Form.Control>
        <Form.Label>Year of Entrance</Form.Label>
        <Form.Control onChange={e => newRow.yearOfEntrance = e.target.value} ></Form.Control>
        <Form.Label>Min Credit</Form.Label>
        <Form.Control onChange={e => newRow.minCredit = e.target.value} ></Form.Control>
        <Form.Label>Max Credit</Form.Label>
        <Form.Control onChange={e => newRow.maxCredit= e.target.value} ></Form.Control>
        </div>
        }
          </Col>    
            </Row>
            <Row>
        {userChosen ==='Grad Student' && 
        <div>
         <Form.Label>Program</Form.Label>
         <Form.Control onChange={e => newRow.program = e.target.value} ></Form.Control>
         <Form.Label>Year In</Form.Label>
         <Form.Control onChange={e => newRow.yearIn = e.target.value} ></Form.Control>
         <Form.Label>Qualifying Exam</Form.Label>
         <Form.Control placeholder ={'1:Yes 0:No'}onChange={e => newRow.qualifyingExam = e.target.value} ></Form.Control>
         <Form.Label>Thesis Title</Form.Label>
         <Form.Control onChange={e => newRow.thesisTitle = e.target.value} ></Form.Control>
         </div>
        }
        </Row>
      
        <Button variant='success' onClick={(e) => submitChanges(e)}>Save Changes</Button>{' '}
    </Form.Group>
        </Form>}
        </div>
    )

}
    