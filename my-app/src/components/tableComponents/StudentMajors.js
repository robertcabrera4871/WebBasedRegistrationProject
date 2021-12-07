import React from "react"
import Table from 'react-bootstrap/Table'
import {useTable} from 'react-table'

export default function StudentMajors({studentMajors, dropMajor}){
  
  const columns = React.useMemo( () => [
        {
            accessor: 'dropMajor',
            width: 30,
            Cell: ({cell}) => (
                <div className="text-align">
                <button onClick={() => dropMajor(cell.row.original.majorID)}>❌</button>
                </div>
              )
        },
        {
            Header: 'Majors',
            accessor: 'majorID'
        }
    ], [dropMajor])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: studentMajors})

  return(
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
                 {cell.render('Cell')}
               </td>
             )
           })}
         </tr>
       )
     })}
   </tbody>
 </Table>)
}