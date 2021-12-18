import Schedule from "./Schedule";
import dbUtil from "../utilities/dbUtil";
import { useState, useEffect } from "react";
import decryptUser from "../utilities/decryptUser";
import Transcript from "./Transcript";
import { useHistory } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup'

import Dropdown from 'react-bootstrap/Dropdown'


export default function DegreeAudit(){
    const [myMajors, setMyMajors] = useState([]);
    const [myMinors, setMyMinors] = useState([]);
    const [minorRequire, setMinorRequire] = useState([]);
    const [majorRequire, setMajorRequire] = useState([]);

    let history = useHistory();


    useEffect(() => {
        getMyMajors();
        getMyMinors();
        getMajorRequirements();
        getMinorRequirements();
    }, [])

    var user = decryptUser();
    if(history.location.state !== undefined){
        user.userID = history.location.state
    }
   
    async function getMyMajors(){
        const response = await dbUtil.getMyMajors(user.userID)
        setMyMajors(response)
    }
    async function getMyMinors(){
        const res = await dbUtil.getMyMinors(user.userID)
        setMyMinors(res)
    }
    async function getMinorRequirements() {
        const res = await dbUtil.myMinorRequirements(user.userID)
        setMinorRequire(res)
    }
    async function getMajorRequirements() {
        const res = await dbUtil.myMajorRequirements(user.userID)
        setMajorRequire(res)
    }
    

    let majorsList = myMajors.map((major, index) => {
        return(
        
        <ListGroup.Item  variant="primary" className="align-center text-align"  key={index}>{major.majorID}</ListGroup.Item>
        )
    })
    let minorList = myMinors.map((minor, index) => {
        return(
        <ListGroup.Item variant="info" className="align-center text-align"  key={index}>{minor.minorID}</ListGroup.Item>
        )
    })

     let requiredCourseMajor = majorRequire.map((course, index) => {
        return(
        <ListGroup.Item  variant="danger" className="align-center text-align" key={index}>{course.courseID}</ListGroup.Item >
        )
    })
    let requiredCourseMinor = minorRequire.map((course, index) => {
        return(
        <ListGroup.Item variant="warning" className="align-center text-align" key={index}>{course.courseID}</ListGroup.Item >
        )
    })
    return(
    <div>
    <h1 className="text-align">Degree Audit 🎓</h1>
    <Transcript/>
    <Schedule/>
    <h2 className="text-align">Majors Enrolled:</h2>
    <ListGroup>
    {majorsList}
    </ListGroup>
    <h2 className="text-align">Minors Enrolled:</h2>
    <ListGroup>
    {minorList}
    </ListGroup>
    <h3 className="text-align">Courses Needed</h3>
    <ListGroup>
    {requiredCourseMajor}
    {requiredCourseMinor}
    </ListGroup>

    </div>
    );
}

