import React from "react"
import checkPrivs from "../../utilities/checkPrivs";
import { useHistory } from 'react-router';
import Table from 'react-bootstrap/Table'
import {useTable} from 'react-table'
import dbUtil from "../../utilities/dbUtil";



export default function DepartmentTable({departments}){

    let privs = checkPrivs();
    let history = useHistory();

    function editDepartment(row){
        history.push({
          pathname: '/editDP',
          state: row
        })
    }
    async function deleteDepartment(row){
      if(window.confirm('Are you sure you wish to delete?')){
         const response = await dbUtil.deleteDepartment(row);
         if(!response.err){
           window.location.reload(false);
         }
      }
   }

    function addDepartment(){
      history.push('/addDepartment')
    }
    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 100,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => editDepartment(cell.row.original)}>✏️</button>
              <div className='bigDivider'/>
              <button onClick={() => deleteDepartment(cell.row.original)}>❌</button>
              </div>
            )
          },
          {
              Header: 'Department',
              accessor: 'departmentID'
          },
          {
              Header: 'RoomID',
              accessor: 'roomID'
          },
          {
              Header: 'Department Email',
              accessor: 'dEmail'
          },
          {
              Header: 'Department Phone',
              accessor: 'dPhone'
          },
          {
            Header: 'Department Chair',
            accessor: 'dChair'
        },
        {
            Header: 'Department Manager',
            accessor: 'dManager'
        }
    ], [])

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
    } = useTable({columns, data: departments, initialState})



    return(
        <div className='table-center'>
            <button onClick={() => {addDepartment()}}>➕ Add Deparment</button>
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