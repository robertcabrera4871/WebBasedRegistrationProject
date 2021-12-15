import Schedule from "./Schedule";
import dbUtil from "../utilities/dbUtil";
import { useState, useEffect } from "react";
import decryptUser from "../utilities/decryptUser";
import Transcript from "./Transcript";
import { useHistory } from "react-router-dom";


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

    // console.log(majorRequire, "MR")
    // console.log(minorRequire , "NR")
    // console.log(myMajors, "MM")
    // console.log(myMinors, "MX")


    let majorsList = myMajors.map((major, index) => {
        return(
        
        <div key={index}>{major.majorID}</div>
        )
    })
    let minorList = myMinors.map((minor, index) => {
        return(
        <div key={index}>{minor.minorID}</div>
        )
    })

     let requiredCourseMajor = majorRequire.map((course, index) => {
        return(
        <h4 className="align-center" key={index}>- {course.courseID}</h4>
        )
    })
    let requiredCourseMinor = minorRequire.map((course, index) => {
        return(
        <h4 key={index}>- {course.courseID}</h4>
        )
    })
    return(
    <div>
    <h1 className="text-align">Degree Audit 🎓</h1>
    <Transcript/>
    <Schedule/>
    <h1 className="text-align">Courses Needed</h1>
    <h3 >Majors Enrolled</h3>
    {majorsList}
    <h3 >Minors Enrolled</h3>
    {minorList}
    {requiredCourseMajor}
    {requiredCourseMinor}
    </div>
    );
}

