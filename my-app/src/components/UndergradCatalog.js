import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import dbUtil from '../utilities/dbUtil'
import Table from 'react-bootstrap/Table'



export default function UndergradCatalog() {
    const [courses, setCourses] = useState([]);
    const [majors, setMajors] = useState([]);
    const [majorRequire, setMajorRequire] = useState([]);
    const [minors, setMinors] = useState([]);
    const [minorRequire, setMinorRequire] = useState([]);

    useEffect(() => {
        getCourses();
        getMajors();
        getMajorRequirements();
        getMinors();
        getMinorRequirements();
    }, [])

    function getCourses() {
        dbUtil.getCourses().then(
            data => {
                setCourses(data)       
                 }
        )
    }
    function getMajors() {
        dbUtil.getMajors().then(
            data => {
                setMajors(data)
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



    return (
        
        <div>UndergradCatalog Page</div>
    );
}
