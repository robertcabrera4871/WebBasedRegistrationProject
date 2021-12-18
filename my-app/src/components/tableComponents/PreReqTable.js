import { useState, useEffect} from 'react';
import {useTable, usePagination} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import dbUtil from '../../utilities/dbUtil';
import checkPrivs from "../../utilities/checkPrivs";

export default function PreReqTable(){

    let privs = checkPrivs();

    const [reqs, setReqs] = useState([])

    useEffect(() => {
        getPrereqs()
    }, [])


   async function getPrereqs(){

        const res = await dbUtil.getPrereqs()   
        setReqs(res)
   }   

   async function deletePrereq(row){
        const res = await dbUtil.deletePrereq(row.courseID)
        if(res.err){
            window.alert(res.err.sqlMessage)
            console.log(res)
        }else{
            window.location.reload(false)
        }
   }
   


   const columns = React.useMemo(() =>[
    {
        accessor: 'Actions',
        width: 10,
        Cell: ({cell}) => (
          <div>
          <button onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) 
           {
              deletePrereq(cell.row.original)
           }}
            }>❌</button>

          </div>
        )
      },
    {
        Header: "Course Name",
        accessor: "courseID"
    },
    {
        Header: "Prereq Course Name",
        accessor: "prereqCourseID"
     },
     {
        Header: "Grade Required",
        accessor: "gradeReq"
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
    } =  useTable({columns, data: reqs, initialState}, usePagination)

    const {pageIndex} = state

    

    return (
        <div className="table-center">
          <h1 className="text-align">All Prereqs</h1>
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
   </span></div>
    );
}