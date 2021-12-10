import dbUtil from "../../utilities/dbUtil";
import { useHistory } from 'react-router';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/DropdownItem'
import React, { useState, useEffect } from "react";

export default function AddUser(){

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
      rank: ""
    }

    const[userChosen, setUserChose] = useState("");

    useEffect(() => {
        if(userChosen){
            newRow.studentType=userChosen
        }
    }, [userChosen])

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

        if(await checkBlanksUndergrad()){return("")}
        const checkTime = await checkFullOrPart();
        if(checkTime === ""){return("")}

        if(checkTime === "full")
        {
           fullRes = await dbUtil.createFullUndergrad(newRow)
        } else if(checkTime === "part"){
           fullRes = await dbUtil.createPartUndergrad(newRow)
        } else {return("")}
      
        const userRes = await dbUtil.createUser(newRow);
        const loginRes = await dbUtil.createLogin(newRow);
        const stuRes = await dbUtil.createStudent(newRow);
        const gradRes = await dbUtil.createUndergrad(newRow);

    }

    async function handleGrad(){
        var fullRes = ""

        if(await checkBlanksGrad()){return("")}
        const checkTime = await checkFullOrPart();
        if(checkTime === ""){return("")}

        const userRes = await dbUtil.createUser(newRow);
        const loginRes = await dbUtil.createLogin(newRow);
        const stuRes = await dbUtil.createStudent(newRow);
        const gradRes = await dbUtil.createGrad(newRow);

        if(checkTime === "full")
        {
           fullRes = await dbUtil.createFullGrad(newRow)
        } else if(checkTime === "part"){
           fullRes = await dbUtil.createPartGrad(newRow)
        } 

    }

    async function checkFullOrPart(){
        if(newRow.minCredit === "0" && newRow.maxCredit === "12"){
            return "full"
        }
        if(newRow.minCredit === "12" && newRow.maxCredit === "18"){
            return "part"
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
        <DropdownButton id='dropdown' title={'User Type'}>
            <DropdownItem onClick={(e) => {setUserChose('Undergrad Student')}}>Undergrad Student</DropdownItem>
            <DropdownItem onClick={(e) => {setUserChose('Grad Student')}}>Grad Student</DropdownItem>
            <DropdownItem onClick={(e) => {setUserChose('Admin')}}>Admin</DropdownItem>
            <DropdownItem onClick={(e) => {setUserChose('Faculty')}}>Faculty</DropdownItem>
            <DropdownItem onClick={(e) => {setUserChose('ResearchStaff')}}>ResearchStaff</DropdownItem>
        </DropdownButton>
        <div>If you submit or type and get an error, reload before changing userType</div>
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
        <Form.Control onChange={e => newRow.DOB = e.target.value} ></Form.Control>
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
    