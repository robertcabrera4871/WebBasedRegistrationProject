import ChoseSemester from './subComponents/ChoseSemester'
import { useState, useEffect, useLocation} from 'react';
import dbUtil from '../utilities/dbUtil';
import {useTable} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import decryptUser from '../utilities/decryptUser';
import formatDate from '../utilities/formateDate';
import Transcript from './Transcript';
import { useHistory } from 'react-router-dom';
import checkPrivs from '../utilities/checkPrivs';
import MasterSchedule from './MasterSchedule';
import timeWindow from '../utilities/timeWindow';
import globalDate from '../utilities/globalDate';
import funcs from '../utilities/timeWindowFunc';

export default function Schedule({title, semesterPicker}){
    let history = useHistory();

    const [semesterSelect, setSemester]= useState("Fall 2021")
    const [schedule, setSchedule] = useState([]);

    let privs = checkPrivs()

    const choseSemester = (semesterChosen) => {
        setSemester(semesterChosen) 
    }

    useEffect(() =>{
        getUserSched();
    }, [semesterSelect]);

    var user = decryptUser();
    var adminUser = history.location.state; 

    if(adminUser !== undefined){
      user.userID = adminUser
    }

   async function dropClass(row){
     const student = await dbUtil.getStudent(user.userID)
      if(await creditCheck(row, student)){{return("")}}
      if(!privs.isAdmin){
      if(!checkDropTime()){return("")}}
      const attRes = await dbUtil.deleteAttendenceByID(user.userID)
      const response = await dbUtil.dropMyClass(row.CRN, user.userID)
      if(response.err){
        window.alert(response.err.sqlMessage)
      } else {
       await updateAvailableSeats(row);
      }

   }

   async function creditCheck(row, student){
    const minMax = await dbUtil.creditCheck(student[0].studentID)
    const credTaking = await dbUtil.getCreditsTaking(student[0].studentID)
    const minCredit = (minMax[0].minCredit)
    const dropClass = row.numOfCredits
    const currentCreds = (credTaking[0].numOfCredits)

    if(currentCreds - dropClass < minCredit){
       window.alert("You will not have enough credits to be fulltime")
       return(true)
    }
    return(false)      
 }

   async function checkDropTime(){
    const res = await timeWindow(funcs.addDrop, false)
    console.log(res)
    return res
   }

   async function updateAvailableSeats(row){
    const res = await dbUtil.plusAvailableSeats(row.CRN)
           if(res.err){
              window.alert(res.err)
           }else{
            window.location.reload(false)
           }
   }

   if(!title){
    title = 'My Schedule';
    semesterPicker = true;
   }

    async function getUserSched(){
        var data = await dbUtil.getUserSched(user.userID)
                if(semesterSelect === "Fall 2021" && semesterPicker){
                    data = data.filter(item => (item.semesterYearID === 'F21' ))
                 } 
                 else if(semesterSelect === "Spring 2022" && semesterPicker){
                    data = data.filter(item => (item.semesterYearID === 'S22'))
                 }
                 setSchedule(data)
    }


    const columns = React.useMemo( () => [
        {
            accessor: 'Actions',
            width: 10,
            Cell: ({cell}) => (
              <div>
                  {!privs.isFaculty &&
              <button onClick={() => dropClass(cell.row.original)}>❌</button>}
              </div>
            )
        },
        {
            Header: "CourseID",
            accessor: "CourseID",
         },
         {
            Header: "CRN",
            accessor: "CRN",
         },
         {
            Header: "Room No.",
            accessor: "roomID",
         },
         {
            Header: "Prof First Name",
            accessor: "firstName",
         },
         {
            Header: "Prof Last Name",
            accessor: "lastName",
         },
         {
             Header: "Semester",
             accessor: "semesterYearID"
         },
         {
             Header: "Day",
             accessor: "day"
         },
         {
             Header: "Period",
             accessor: "period"
         },
         {
             Header: "Grade",
             accessor: "grade"
         },
         {
             Header: "Enroll Date",
             accessor: "enrollDate"
         }



    ], [])
    

    
    var initialState = ""
    if(title !== "Drop Classes"){
      initialState = {hiddenColumns: ['Actions']}
    }
    if(adminUser !== undefined && history.location.pathname != "/degreeAudit"){
      initialState = ""
    }

    formatDate(schedule, "enrollDate")


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: schedule, initialState})

      
    

    
    return(
        <div  className="table-center">
        {(semesterPicker !== false) ? <ChoseSemester semesterSelect={semesterSelect} onClick={choseSemester}/>
        : ""}
        <h1 className="text-align">{title ? title: "My Schedule"}</h1>   
        <Table size="sm" striped bordered hover {...getTableProps()}>
      <thead>
        { headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                { column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
 
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    { cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
    {history.location.state !== undefined && 
    history.location.pathname != '/degreeAudit' && history.location.pathname != '/dropClass' &&<MasterSchedule/>}
        </div>
    );
}
