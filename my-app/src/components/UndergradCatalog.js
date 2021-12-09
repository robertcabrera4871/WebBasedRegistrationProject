import React, { useState, useEffect } from "react";
import dbUtil from '../utilities/dbUtil'
import CourseTable from "./tableComponents/CourseTable";
import ReqTable from "./tableComponents/ReqTable";
import checkPrivs from "../utilities/checkPrivs";
import { useHistory } from 'react-router';


export default function UndergradCatalog() {

    
    const [majors, setMajors] = useState([]);
    const [minors, setMinors] = useState([]);
    const [minorRequire, setMinorRequire] = useState([]);
    const [majorRequire, setMajorRequire] = useState([]);

    const privs = checkPrivs();
    let history = useHistory();

    useEffect(() => {
        getMajors();
        getMinors();
        getMajorRequirements();
        getMinorRequirements();
    }, [])

   
    function getMajors() {
        dbUtil.getMajors().then(
            data => {
                setMajors(data)
            }
        )
    }
    function getMinors() {
        dbUtil.getMinors().then(
            data => {
                setMinors(data)
            }
        )
    }
    function getMinorRequirements() {
        dbUtil.getMinorRequirements().then(
            data => {
                setMinorRequire(data)
            }
        )
    }
    function getMajorRequirements() {
        dbUtil.getMajorRequirements().then(
            data => {
                setMajorRequire(data)
            }
        )
    }

    function addMajor(){
        history.push({
           pathname: '/AddMajor'
        })
     }

     function addCourse(){
        history.push({
            pathname: '/AddCourse'
         })
     }

    let majorsTables = majors.map((major, index) =>{
        return (
            <span>
            {privs.isAdmin && <button>➕ Add Requirement</button>}
            <div key={index}>
            {privs.isAdmin && <button>❌ Delete Major</button>}
            <h4>{major.majorID}:</h4>
            </div>  
            <ReqTable major={major.majorID} requirements={majorRequire}/>
            </span>
        )});

     let minorsTables = minors.map((minor, index) =>{
        return (
            <span>
            {privs.isAdmin && <button>➕ Add Requirement</button>}
            <h4 key={index}>{minor.minorID}:</h4>
            <ReqTable minor={minor.minorID} requirements={minorRequire}/>
            </span>
        )});

    return (
        <div className="align-center">
            <h1 className="text-align"> Undergraduate Courses</h1>
            {privs.isAdmin && <button onClick={() =>{addCourse()}}>➕ Add Course</button>}
            <CourseTable/>
            {privs.isAdmin && <button onClick={() =>{addMajor()}}
            >📘 Add Major</button>}
            <h1 className="text-align">Major Requirements</h1>
            {majorsTables}
            {privs.isAdmin && <button>📙 Add Minor</button>}
            <h1 className="text-align">Minor Requirements</h1>
            {minorsTables}
        </div>
    )
}
