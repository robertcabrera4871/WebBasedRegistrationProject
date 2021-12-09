import {useTable} from 'react-table'
import Table from 'react-bootstrap/Table'
import React from "react";
import checkPrivs from "../../utilities/checkPrivs";
import dbUtil from '../../utilities/dbUtil';
import { useHistory } from 'react-router';

export default function BuildingsTable({buildings}){
    let history = useHistory();

    function clicked(){

    }


    const privs = checkPrivs();

     function addBuilding(){
        history.push('/AddBuilding')
    }

    const columns = React.useMemo(() => [
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
            Header: 'Building Name',
            accessor: 'buildingID'
        },
        {
            Header: 'Building Use',
            accessor: 'buildingUse'
        }
    ] , [])

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
    } = useTable({columns, data: buildings, initialState})

    return(
        <div className='table-center'>
            <button onClick={() => {addBuilding()}}>➕ Add Building</button>
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
   </div>)
}