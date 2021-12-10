import {useTable} from 'react-table'
import Table from 'react-bootstrap/Table'
import React from "react";
import checkPrivs from "../../utilities/checkPrivs";
import { useHistory } from 'react-router';
import dbUtil from '../../utilities/dbUtil';

export default function BuildingsTable({buildings}){
    let history = useHistory();

    async function deleteBuilding(row){
       if(window.confirm('Are you sure you wish to delete?')){
          const response = await dbUtil.deleteBuilding(row);
          if(!response.err){
            window.location.reload(false);
          }
       }
    }

    function editBuilding(row){
      history.push({
        pathname: '/editBuilding',
        state: row
      })
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
              <button onClick={() => editBuilding(cell.row.original)}>✏️</button>
              <div className='bigDivider'/>
              <button onClick={() => deleteBuilding(cell.row.original)}>❌</button>
              </div>
            )
          },
        {
            Header: 'Building Name',
            accessor: 'buildingID'
        },
        {
          //spelledIncorrectly in DB
            Header: 'Building Use',
            accessor: 'buidingUse'
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