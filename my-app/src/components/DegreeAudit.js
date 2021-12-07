import Schedule from "./Schedule";
import dbUtil from "../utilities/dbUtil";
import { useState, useEffect } from "react";
import decryptUser from "../utilities/decryptUser";

export default function DegreeAudit(){
    const [myMajors, setMyMajors] = useState([]);
    const [myMinors, setMyMinors] = useState([]);
    const [minorRequire, setMinorRequire] = useState([]);
    const [majorRequire, setMajorRequire] = useState([]);


    //Need actual Data to test... waiting for Sarah and Romina

    useEffect(() => {
        getMyMajors();
        getMyMinors();
        getMajorRequirements();
        getMinorRequirements();
    }, [])

    var user = decryptUser();
   
    function getMyMajors(){
        dbUtil.getMyMajors(user.userID).then(
            data => {
                console.log(data)
                setMyMajors(data)
            }
        )
    }
    function getMyMinors(){
        dbUtil.getMyMinors(user.userID).then(
            data => {
                console.log(data)

                setMyMinors(data)
            }
        )
    }
    function getMinorRequirements() {
        dbUtil.getMinorRequirements().then(
            data => {
                console.log(data)
                setMinorRequire(data)
            }
        )
    }
    function getMajorRequirements() {
        dbUtil.getMajorRequirements().then(
            data => {
                console.log(data)
                setMajorRequire(data)
            }
        )
    }

    return(
    <div>
    <Schedule semesterPicker={false} title='Degree Audit'/>
    <h1 className="text-align">Courses Needed</h1>
    </div>
    );
}

