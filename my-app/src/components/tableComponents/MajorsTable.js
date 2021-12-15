import React from "react"
import Table from 'react-bootstrap/Table'
import {useTable} from 'react-table'
import { useEffect } from "react"
import checkPrivs from "../../utilities/checkPrivs"

export default function MajorsTable({majors, addMajor}){

  let privs = checkPrivs()

    const columns = React.useMemo( () => [
        {
            accessor: 'addMajor',
            width: 30,
            Cell: ({cell}) => (
                <div className="text-align">
                    {!privs.isFaculty &&
                <button onClick={() => addMajor(cell.row.original.majorID)}>➕</button>}
                </div>
              )
        },
        {
            Header: 'Majors',
            accessor: 'majorID'
        }
    ], [addMajor])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: majors})

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