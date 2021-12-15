import React from "react"
import Table from 'react-bootstrap/Table'
import {useTable} from 'react-table'
import checkPrivs from "../../utilities/checkPrivs"

export default function MinorsTable({minors, addMinor}){
  let privs = checkPrivs()
    const minorColumns = React.useMemo( () => [
        {
            accessor: 'addMinor',
            width: 30,
            Cell: ({cell}) => (
                <div className="text-align">
                    {!privs.isFaculty &&
                <button c onClick={() => addMinor(cell.row.original.minorID)}>➕</button>}
                </div>
              )
        },
        {
            Header: 'Minors',
            accessor: 'minorID'
        }
    ], [addMinor])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns: minorColumns, data: minors})

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