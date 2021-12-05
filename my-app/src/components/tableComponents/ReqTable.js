import React from "react";
import { useTable } from "react-table";
import Table from 'react-bootstrap/Table';
import checkPrivs from "../../utilities/checkPrivs";

export default function ReqTable({major, minor, requirements}) {

    function clicked(row){
      console.log(row)
    }

    const privs = checkPrivs();

    const columns = React.useMemo( () =>[
      {
        accessor: 'Actions',
        width: 100,
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
