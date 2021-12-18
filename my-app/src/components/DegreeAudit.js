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
    }, [])
        
    var user = decryptUser();
    if(history.location.state !== undefined){
        user.userID = history.location.state
    }
   
    async function getMyMajors(){
        const response = await dbUtil.getMyMajors(user.userID)
        await getMajorRequirements(response)
        setMyMajors(response)
    }
    async function getMyMinors(){
        const res = await dbUtil.getMyMinors(user.userID)
        await getMinorRequirements(res)
        setMyMinors(res)
    }
    async function getMinorRequirements(minors) {
        const requirements = [];
        for(const minor in minors){
           const reqs = await dbUtil.myMinorRequirements(user.userID, minors[minor].minorID)
            for(const req in reqs)
            requirements.push(reqs[req])
        }
        setMinorRequire(requirements)
    }
    async function getMajorRequirements(majors) {
        const requirements = [];
        for(const major in majors){
           const reqs = await dbUtil.myMajorRequirements(user.userID, majors[major].majorID)
            for(const req in reqs)
            requirements.push(reqs[req])
        }
        setMajorRequire(requirements)
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

