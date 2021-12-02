import React from "react";
import { useTable } from "react-table";
import Table from 'react-bootstrap/Table'



export default function ReqTable({major, minor, requirements}) {

    const columns = React.useMemo( () =>[
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


    const courseTable = useTable({columns, data: requirements});
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
