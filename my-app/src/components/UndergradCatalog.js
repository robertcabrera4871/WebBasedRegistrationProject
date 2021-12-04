import React, { useState, useEffect } from "react";
import dbUtil from '../utilities/dbUtil'
import CourseTable from "./tableComponents/CourseTable";
import ReqTable from "./tableComponents/ReqTable";



export default function UndergradCatalog() {
    
    const [majors, setMajors] = useState([]);
    const [minors, setMinors] = useState([]);
    const [minorRequire, setMinorRequire] = useState([]);
    const [majorRequire, setMajorRequire] = useState([]);

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

    let majorsTables = majors.map((major, index) =>{
        return (
            <span>
            <h4 key={index}>{major.majorID}:</h4>
            <ReqTable major={major.majorID} requirements={majorRequire}/>
            </span>
        )});

     let minorsTables = minors.map((minor, index) =>{
        return (
            <span>
            <h4 key={index}>{minor.minorID}:</h4>
            <ReqTable minor={minor.minorID} requirements={minorRequire}/>
            </span>
        )});

    return (
        <div className="table-center">
            <h1 className="text-align">Courses</h1>
            <CourseTable/>
            <h1 className="text-align">Major Requirements</h1>
            {majorsTables}
            <h1 className="text-align">Minor Requirements</h1>
            {minorsTables}
        </div>
    )
}
