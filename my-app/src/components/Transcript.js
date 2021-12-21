import ChoseSemester from './subComponents/ChoseSemester'
import { useState, useEffect, } from 'react';
import dbUtil from '../utilities/dbUtil';
import {useTable} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import decryptUser from '../utilities/decryptUser';
import MasterSchedule from './MasterSchedule';
import { useHistory } from 'react-router-dom';
import checkPrivs from '../utilities/checkPrivs';

export default function Transcript(){

    const [transcript, setTranscript] = useState([]);
    let history = useHistory();
    let privs = checkPrivs();

    useEffect(() =>{
        getStudentHistory();
    }, []);

    var user = decryptUser();

    if(history.location.state !== undefined){
        user.userID = history.location.state
    }

    async function getStudentHistory(){
        const res =  await dbUtil.getStudentHistory(user.userID)
        const updateRes = await dbUtil.updateCreditsEarned(user.userID)
        console.log(updateRes)
        const courses = []
        for(const i in res){
            courses.push(res[i].courseID)
        }
        console.log(courses)
        setTranscript(res)
    }

    async function addHistory(){
        history.push({
            pathname: '/AddTranscript', 
            state: user.userID
         })
    }
    async function displayPreReq(row){
      const res = await dbUtil.getPrereqByID(row.courseID)
      if(res.err){
          window.alert(res.err.sqlMessage)
      }else if(res.length === 0){
          window.alert("There are no prereqs for this course")
      }else{
          window.alert(res[0].prereqCourseID)
      }
}

    async function deleteHistory(row){
      console.log(row.CRN)
      console.log(user.userID)
        const res = await dbUtil.deleteStudentHistory(row.CRN, user.userID)
        if(res.err){
          window.alert(res.err.sqlMessage)
          console.log(res)
        }else{
          window.location.reload(false)
        }
    }

    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 10,
            Cell: ({cell}) => (
              <div id='parent' >
              <div className='bigDivider'/>
              <button className='child' onClick={() => {
               if (window.confirm('Are you sure you wish to delete this item?')) 
               {
                deleteHistory(cell.row.original)
               }}
                }>❌</button>
                <div className='bigDivider'/>
              <button className='child' title="View Prereqs" onClick={() => displayPreReq(cell.row.original)}>↪️</button>
              </div>
            )
          },
        {
          Header: "Course ID",
          accessor: 'courseID'
        },
        {
          Header: "CRN",
          accessor: "CRN",
        },
        {
          Header: "SemesterYearID",
          accessor: "semesterYearID"
        },
        {
          Header: "Grade",
          accessor: "grade"
        }
    ], [])

    var initialState = ""
    if(!privs.isAdmin){
      initialState = {hiddenColumns: ['Actions']}
    }

      

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: transcript, initialState})

    return(
    <div>
        <div className="table-center">
        <h1 className="text-align">Transcript</h1>   
        {privs.isAdmin && <button onClick={() => {addHistory()}}>➕ Add to Transcript</button>}
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
        </div>
    </div>
    );
}
