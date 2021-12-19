import React, { useEffect, useState } from "react"
import {useTable, usePagination} from 'react-table'
import Table from 'react-bootstrap/Table'
import dbUtil from "../../utilities/dbUtil";
import { useHistory } from "react-router-dom";
import formatDate from "../../utilities/formateDate";


export default function FacultyDeptTable({deptChosen}){

    const [facDept, setFacDept] = useState([])
    let history = useHistory();

    useEffect(() => {
        getFacultyDepartment();
    },[deptChosen])

    async function getFacultyDepartment(){
        const res = await dbUtil.getFacultyDepartment(deptChosen)
        console.log(res)
    if(!res.err){
            formatDate(res, 'dateOfAppt')
            setFacDept(res)
        }
        
    }

     function addFacDept(){
        history.push({
            pathname: "/addFacDept",
            state: deptChosen
        })
    }

    async function deleteAppointment(row){
        const res = await dbUtil.deleteDepAppt(row)
        if(!res.err){
            window.location.reload(false)
        }
        console.log(res.err)
    } 


    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 100,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => {
               if (window.confirm('Are you sure you wish to delete this item?')) 
               {
                    deleteAppointment(cell.row.original);
                    
               }}
                }>❌</button>
              </div>
            )
          },
          {
            Header: "First Name",
            accessor: "firstName"
        },
        {
            Header: "Last Name",
            accessor: "lastName"
        },
        { 
            Header: "DepartmentID",
            accessor: "departmentID"
        },
        {
            Header: "Time Commitment",
            accessor: "percTimeCommitment"
        },
        {
            Header: "Date Of Appointment",
            accessor: "dateOfAppt"
        }
    ], [])


    
    
    
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
    } = useTable({columns, data: facDept, initialState: {hiddenColumns:['facultyID']}}, usePagination)

    const {pageIndex} = state

    

    return (
        <div className="table-center">
            {deptChosen.length !== 0 && 
            <div>
                <button onClick={() => {addFacDept()}}>➕ Add Faculty</button>
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
      </div> }
      </div>
       );
}