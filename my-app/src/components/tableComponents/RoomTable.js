import {useTable, usePagination, useFilters} from 'react-table'
import Table from 'react-bootstrap/Table'
import React from "react";
import checkPrivs from "../../utilities/checkPrivs";
import dbUtil from '../../utilities/dbUtil';
import { useHistory } from 'react-router';
import ColumnFilter from './ColumnFilter';


export default function RoomTable({rooms}){

    let history = useHistory();

    function editRoom(row){
      history.push({
        pathname: '/editRoom',
        state: row
      })
    }
    async function deleteRoom(row){
      if(window.confirm('Are you sure you wish to delete?')){
         const response = await dbUtil.deleteRoom(row);
         console.log(response)
         if(!response.err){
           window.location.reload(false);
         }
      }
   }
    
    const privs = checkPrivs();
    

    const columns = React.useMemo( () => [
        {
            accessor: 'Actions',
            Filter: "",
            width: 100,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => editRoom(cell.row.original)}>✏️</button>
              <div className='bigDivider'/>
              <button onClick={() => deleteRoom(cell.row.original)}>❌</button>
              </div>
            )
          },
        {
            Header: 'Room Name',
            accessor: 'roomID',
            Filter: ColumnFilter
        }, 
        {
            Header: 'Building Name',
            accessor: 'buildingID',
            Filter: ColumnFilter
        },
        {
            Header: 'Room Type',
            accessor: 'roomType',
            Filter: ColumnFilter

        }
    ] , [])


     function addRoom(){
        history.push('/addRoom')
    }

    var initialState = ""
    if(!privs.isAdmin){
      initialState = {hiddenColumns: ['Actions']}
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
    } = useTable({columns, data: rooms, initialState}, useFilters, usePagination)

    const {pageIndex} = state

    return(
        <div className='table-center'>
         <button onClick={() => {addRoom()}}>➕ Add Room</button>
        <Table size="sm" striped bordered hover {...getTableProps()}>
     <thead>
       { headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map(column => (
              <th className='column'{...column.getHeaderProps()}>
              { column.render('Header')}
              <div className='filter'>{column.canFilter? column.render('Filter') : null }</div>
              
             </th>
           ))}
         </tr>
       ))}
     </thead>

     <tbody {...getTableBodyProps()}>
       {page.map(row => {
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
   <span className='align-center'>
       Page{' '}
       <strong>
          {pageIndex + 1} of {pageOptions.length}
       </strong>
       <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
       <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
    </span>
   </div>
    )
}