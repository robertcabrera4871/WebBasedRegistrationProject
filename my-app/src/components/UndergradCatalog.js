import React, { useState, useEffect } from "react";
import dbUtil from '../utilities/dbUtil'
import ReqTable from "./tableComponents/ReqTable";
import checkPrivs from "../utilities/checkPrivs";
import { useHistory } from 'react-router';
import { useTable, usePagination } from "react-table";
import Table from 'react-bootstrap/Table'


export default function UndergradCatalog() {

    
    const [majors, setMajors] = useState([]);
    const [minors, setMinors] = useState([]);
    const [minorRequire, setMinorRequire] = useState([]);
    const [majorRequire, setMajorRequire] = useState([]);
    const [courses, setCourses] = useState([]);
    const privs = checkPrivs();
    let history = useHistory();

useEffect(() => {
        getMajors();
        getMinors();
        getMajorRequirements();
        getMinorRequirements();
        getCourses(); 
    }, [])

    function getCourses(){
        dbUtil.getUndergradCourses().then(data =>{
            setCourses(data)
        })
    }
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
    function editCourse(row){
        history.push({
          pathname: '/EditCourse',
          state: row
        })
      }

      function deleteCourse(row){
        dbUtil.deleteCourse(row).then(data =>{
          if(data.err){
             window.alert(data.err.sqlMessage)
         }else{
          window.location.reload(false);
         }
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

    const columns = React.useMemo( () => [
        {
            accessor: 'Actions',
            width: 100,
            Cell: ({cell}) => (
              <div id='parent'>
              <button className='child' onClick={() => editCourse(cell.row.original)}>✏️</button>
              <div className='bigDivider'/>
              <button className='child'onClick={() => {
               if (window.confirm('Are you sure you wish to delete this item?')) 
               {
                  deleteCourse(cell.row.original)
               }}
                }>❌</button>
              </div>
            )
          },

        {
            accessor: 'PreReq',
            Cell: ({cell}) => (
                <div className='bigDivider'>
                <button title="View Prereqs" onClick={() => displayPreReq(cell.row.original)}>↪️</button>
                </div>
            )
        },
        {
            Header: 'Course Name',
            accessor: 'courseID'
        },
        {
            Header: 'Department',
            accessor: 'departmentID'
        },
        {
            Header: 'Credits',
            accessor: 'numOfCredits'
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
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
      } = useTable({columns, data: courses, initialState}, usePagination)

      const {pageIndex} = state

    function addMajor(){
        history.push({
           pathname: '/AddMajor'
        })
     }
    
     async function deleteMajor(major){
        const response = await dbUtil.deleteMajor(major.majorID);
        if(response.err){
            console.log(response)
            window.alert(response.err.sqlMessage)
        }else{
            window.location.reload(false)
        }
     }

     async function deleteMinor(minor){
        const response = await dbUtil.deleteMinor(minor.minorID);
        if(response.err){
            window.alert(response.err.sqlMessage)
        }else{
            window.location.reload(false)
        }
     }

     function checkReqsMaj(majorID, requirements){
        history.push({
            pathname: '/majorRequirements',
            state: {majorID, requirements}
        })
     }

     function checkReqsMin(minorID, requirements){
        history.push({
            pathname: '/minorRequirements',
            state: {minorID, requirements}
        })
     }

     


    let majorsTables = majors.map((major, index) =>{
        return (
            <div id ='parent'>
            <h4>{major.majorID}:</h4>
            <button className="child" onClick={() => {checkReqsMaj(major.majorID, majorRequire)}}>View Requirements ✔️</button>
            <span>
            {privs.isAdmin &&  <button className="child" onClick={() => {history.push({
                pathname: '/AddMRequire',
                state: major
            })}}
            >➕ Add Requirement</button>}
            <div className="child" key={index}>
            {privs.isAdmin && <button onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) 
           {
              deleteMajor(major)
           }}}>❌ Delete Major</button>}
         
            </div>  
            {/* <ReqTable major={major.majorID} requirements={majorRequire}/> */}
         
            </span>
            </div>
        )});

     let minorsTables = minors.map((minor, index) =>{
        return (
            <div id="parent">
            <span>
            <h4 key={index}>{minor.minorID}:</h4>
            <button className="child" onClick={() => {checkReqsMin(minor.minorID, minorRequire)}}>View Requirements ✔️</button>
            {privs.isAdmin && <button className="child" onClick={() => {history.push({
                pathname: '/AddMinorRequire',
                state: minor
            })}}>➕ Add Requirement</button>}
            <div className="child" key={index}>
            {privs.isAdmin && <button  onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) 
           {
              deleteMinor(minor)
           }} }>❌ Delete Minor</button>}
            
            </div>
            {/* <ReqTable minor={minor.minorID} requirements={minorRequire}/> */}
           
            </span>
            </div>
        )});

    return (
        <div className="align-center">
            <h1 className="text-align"> Undergraduate Courses</h1>
                    <Table size="sm" striped bordered hover {...getTableProps()}>
            <thead>
                { headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps({
                        style: {width: column.width}
                    })}>
                        { column.render('Header')}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
        
            <tbody {...getTableBodyProps()}>
                {page.map(row => {
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
                        <span className='align-center'>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
                </span>
          
            <h1 className="text-align">Major Requirements</h1>
            {privs.isAdmin && <button onClick={() =>{addMajor()}}
            >📘 Add Major</button>}
            {majorsTables}
            <h1 className="text-align">Minor Requirements</h1>
            {privs.isAdmin && <button onClick={() => {history.push('/AddMinor')}}>📙 Add Minor</button>}
            {minorsTables}
        </div>
    )
}
