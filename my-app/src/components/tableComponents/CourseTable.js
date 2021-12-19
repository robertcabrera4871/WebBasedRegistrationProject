import React, { useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import dbUtil from "../../utilities/dbUtil";
import Table from 'react-bootstrap/Table'
import checkPrivs from "../../utilities/checkPrivs";
import { useHistory } from "react-router";
import PreReqTable from "./PreReqTable";


export default function CourseTable() {
    const [courses, setCourses] = useState([]);

    const privs = checkPrivs();
    let history = useHistory();

    useEffect(() => {
        getCourses();
    }, [])

    function getCourses() {
        dbUtil.getCourses().then(
            data => {
              console.log(data)
                setCourses(data);     
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

    async function addPrereq(row){
        history.push({
          pathname: '/addPreReq',
          state: row.courseID
        })
    }

    const columns = React.useMemo( () =>[
      {
        accessor: 'Actions',
        width: 10,
        Cell: ({cell}) => (
          <div>
          <button onClick={() => editCourse(cell.row.original)}>✏️</button>
          <div className='bigDivider'/>
          <button onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) 
           {
              deleteCourse(cell.row.original)
           }}
            }>❌</button>
            <div className='bigDivider'/>
            <button onClick={()=>{addPrereq(cell.row.original)}}title="Add Prereq"> ↪️</button>
          </div>
        )
      },
    {
        Header: "Course Name",
        accessor: "courseID"
    },
    {
        Header: "Department",
        accessor: "departmentID"
     },
     {
        Header: "Credits",
        accessor: "numOfCredits"
     },
    ], []);

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
    } =  useTable({columns, data: courses, initialState}, usePagination)

    const {pageIndex} = state

    return (
      <div className="table-center">
        <h1 className="text-align">All Courses</h1>
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
 <div>
   <PreReqTable/>
   </div>
 </div>


    );
}
