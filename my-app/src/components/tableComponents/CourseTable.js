import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
import dbUtil from "../../utilities/dbUtil";
import Table from 'react-bootstrap/Table'



export default function CourseTable() {
    const [courses, setCourses] = useState([]);

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

    const columns = React.useMemo( () =>[
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

    const courseTable = useTable({columns, data: courses});
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = courseTable



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
