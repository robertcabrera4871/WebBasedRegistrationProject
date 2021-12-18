import React from "react";
import { useTable } from "react-table";
import Table from 'react-bootstrap/Table';
import checkPrivs from "../../utilities/checkPrivs";
import dbUtil from "../../utilities/dbUtil";

export default function ReqTable({major, minor, requirements}) {

    const grades = ['A', 'B', 'C', 'D', 'F', 'IP'];


    const privs = checkPrivs();

    async function deleteMajorReq(row){
      const response = await dbUtil.deleteMajorReq(major, row.courseID)
      if(response.err){
        console.log(response.err)
      }else{
        window.location.reload(false);
      }
    }
    async function deleteMinorReq(row){
      const response = await dbUtil.deleteMinorReq(minor, row.courseID)
      if(response.err){
        console.log(response.err)
      }else{
        window.location.reload(false);
      }

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


    const columns = React.useMemo( () =>[
      {
        accessor: 'Actions',
        width: 100,
        Cell: ({cell}) => (
          <div id="parent">
          <button className="child" onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) 
           {
             if(major){deleteMajorReq(cell.row.original)}
             else if(minor){deleteMinorReq(cell.row.original)}
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
        Header: "Course Name",
        accessor: "courseID"
    },
     {
        Header: "Minimum Grade",
        accessor: "minCourseGrade"
     },
    ], []);
    
    
    major ? requirements = requirements.filter(item => (item.majorID === major)):
    requirements = requirements.filter(item => (item.minorID === minor));


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
    } = useTable({columns, data: requirements, initialState})
    



    return (
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
    );
}
