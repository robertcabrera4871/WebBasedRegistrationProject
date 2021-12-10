import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'
import React, { useState, useEffect } from "react";


export default function AddUser(chosenType){
    const userChosen = chosenType.location.state
    let history = useHistory()

    
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
      //For LoginInfo only
      userType: ""
    }

    newRow.studentType = userChosen

    async function submitChanges(e){
        e.preventDefault();
        console.log(newRow)
        await trimWhiteSpace();

        switch(userChosen){
            case "Undergrad Student": 
            await handleUndergrad(); break;
            case "Grad Student": 
            await handleGrad(); break;
            case "Faculty":
            await handleFaculty(); break;
            
        }

    }

    async function handleUndergrad(){
        var fullRes = ""
        newRow.userType="student";
        if(await checkBlanksUndergrad()){return("")}
        const checkTime = await checkFullOrPart();
        if(checkTime === ""){return("")}

        const userRes = await dbUtil.createUser(newRow);
        console.log(userRes)
        if(userRes?.err?.code === "ER_DUP_ENTRY"){window.alert("Duplicate userID")}
        if(userRes.err){window.alert("Failed to Insert: User (Check number fields and dates)"); return("")}
        const loginRes = await dbUtil.createLogin(newRow);
        if(loginRes.err){window.alert("Failed to Insert: LoginInfo"); return(reverseChanges())}
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
           if(fullRes.err){window.alert("Failed to Insert: Part Undergraduate"); return(reverseChanges())}
        } else {return("")}
      
   

    }

    async function handleGrad(){
        var fullRes = ""
        newRow.userType="student";
        if(await checkBlanksGrad()){return("")}
        const checkTime = await checkFullOrPart();
        if(checkTime === ""){return("")}
        const userRes = await dbUtil.createUser(newRow);
        console.log(userRes)
        if(userRes.err.code === "ER_DUP_ENTRY"){window.alert("Duplicate userID")}
        if(userRes.err){window.alert("Failed to Insert: User (Check number fields and dates)"); return("")}
        const loginRes = await dbUtil.createLogin(newRow);
        console.log(loginRes)
        if(loginRes.err){window.alert("Failed to Insert: LoginInfo"); return(reverseChanges())}
        const stuRes = await dbUtil.createStudent(newRow);
        if(stuRes.err){window.alert("Failed to Insert: Student (Check number fields and dates)"); return(reverseChanges())}
        const gradRes = await dbUtil.createGrad(newRow);
        if(gradRes.err){window.alert("Failed to Insert: Undergraduate"); return(reverseChanges())}


        if(checkTime === "full")
        {
           fullRes = await dbUtil.createFullGrad(newRow)
           if(fullRes.err){window.alert("Failed to Insert: Full Undergraduate"); return(reverseChanges())}

        } else if(checkTime === "part"){
           fullRes = await dbUtil.createPartGrad(newRow)
           if(fullRes.err){window.alert("Failed to Insert: Full Undergraduate"); return(reverseChanges())}
        } 

    }

    async function reverseChanges(){
        const response = await dbUtil.deleteUser(newRow)
        return("")
    }

    async function checkFullOrPart(){
        if(newRow.minCredit === "0" && newRow.maxCredit === "12"){
            return "part"
        }
        if(newRow.minCredit === "12" && newRow.maxCredit === "18"){
            return "full"
        }
      window.alert("Valid Min: 0/12 Valid Max: 12/18")
      return("")

    }

    async function handleFaculty(){
        // response = await dbUtil.createFaculty(newRow)
        //     console.log(response)
        //     response = await dbUtil.createFullPartFac(newRow); 
        //     console.log(response); 

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
        newRow.yearIn === '' ||  newRow.qualifyingExam === '' || newRow.thesisTitle=== '' ){
            window.alert('Please ensure no blank spaces')
            return true
        } 
        return false
    }
    async function trimWhiteSpace(){
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
        <Form.Control onChange={e => newRow.rank = e.target.value} ></Form.Control></div>
        }
        {(userChosen === 'Undergrad Student' || userChosen === 'Grad Student' )&& <div>
        <Form.Label>Credits Earned</Form.Label>
        <Form.Control onChange={e => newRow.creditsEarned = e.target.value} ></Form.Control>
        <Form.Label>Year Level</Form.Label>
        <Form.Control onChange={e => newRow.yearLevel = e.target.value} ></Form.Control>
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
         <Form.Control onChange={e => newRow.qualifyingExam = e.target.value} ></Form.Control>
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
    