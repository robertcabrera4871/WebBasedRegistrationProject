import React, { useState, useEffect} from "react";
import { useTable } from "react-table";
import dbUtil from '../utilities/dbUtil'
import Table from 'react-bootstrap/Table'


export default function AllUsers(){

    const [users, setUsers] = useState([]);

    useEffect(() =>{
        getUsers();
    }, []
    );

    function getUsers(){
        dbUtil.getAllUsers().then(
            data =>{
                setUsers(data)
            }
        )
     } 

     const data = users;

     const columns = React.useMemo( () =>[
        {
            Header: "User ID",
            accessor: "userID"
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
            Header: "DOB",
            accessor: "DOB"
        },
        {
            Header: "City",
            accessor: "city"
        },
        {
            Header: "State",
            accessor: "state"
        },
        {
            Header: "Zip",
            accessor: "zipCode"
        },
        {
            Header: "Address",
            accessor: "address"
        },
        {
            Header: "Type",
            accessor: "userType"
        }

     ], []);

     const tableInstance = useTable({ columns, data })
      
     const {
       getTableProps,
       getTableBodyProps,
       headerGroups,
       rows,
       prepareRow,
     } = tableInstance

    return(
      <div className='table-center'>
        <h1 className='text-align'>All Users</h1>
        <Table size="sm" striped bordered hover {...getTableProps()}>
      <thead>
        {// Loop over the header rows
        headerGroups.map(headerGroup => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
            headerGroup.headers.map(column => (
              // Apply the header cell props
              <th {...column.getHeaderProps()}>
                {// Render the header
                column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {// Loop over the table rows
        rows.map(row => {
          // Prepare the row for display
          prepareRow(row)
          return (
            // Apply the row props
            <tr {...row.getRowProps()}>
              {// Loop over the rows cells
              row.cells.map(cell => {
                // Apply the cell props
                return (
                  <td {...cell.getCellProps()}>
                    {// Render the cell contents
                    cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
    </div>
    );
}
