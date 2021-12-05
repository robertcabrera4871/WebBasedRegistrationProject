import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import dbUtil from "../../utilities/dbUtil";
import Table from 'react-bootstrap/Table'
import checkPrivs from "../../utilities/checkPrivs";


export default function CourseTable() {
    const [courses, setCourses] = useState([]);

    const privs = checkPrivs();

    useEffect(() => {
        getCourses();
    }, [])

    function getCourses() {
        dbUtil.getCourses().then(
            data => {
                setCourses(data);     
                 }
        )
    }

    
    function clicked(row){
      console.log(row)
    }

    const columns = React.useMemo( () =>[
      {
        accessor: 'Actions',
        width: 10,
        Cell: ({cell}) => (
          <div>
          <button onClick={() => clicked(cell.row.original)}>✏️</button>
          <div className='bigDivider'/>
          <button onClick={() => clicked(cell.row.original)}>❌</button>
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
        rows,
        prepareRow,
    } =  useTable({columns, data: courses, initialState})



    return (
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
    );
}
