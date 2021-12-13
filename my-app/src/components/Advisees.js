import { useEffect, useState } from "react";
import dbUtil from "../utilities/dbUtil";
import React from "react";
import { useTable } from "react-table";
import Table  from "react-bootstrap/Table";
import decryptUser from "../utilities/decryptUser";
import checkPrivs from "../utilities/checkPrivs";
import { useHistory } from "react-router-dom";


export default function Advisees(adminAccess){
    const[myAdvisees, setMyAdvisees] = useState([]);
    let privs = checkPrivs();
    let history = useHistory();

    useEffect(() => {
        getMyAdvisees();
    }, [])

   var user = decryptUser();

   async function getMyAdvisees(){
       if(privs.isAdmin){user.userID = adminAccess.location.state}
       const response = await dbUtil.getMyAdvisees(user.userID)

       setMyAdvisees(response)
   }

   function addAdvisee(){
    history.push("/addAdvising");
  }
  async function deleteAdvising(row){
    const response = await dbUtil.deleteAdvising(row.userID, user.userID);
    if(response.err){
        window.alert(response.err.sqlMessage)
    } else if(response.affectedRows === 1){
        window.location.reload(false)
    }
  }


   const columns = React.useMemo(() =>[
    {
        accessor: 'Actions',
        width: 10,
        Cell: ({cell}) => (
          <div>
          <button onClick={() => {
           if (window.confirm('Are you sure you wish to delete this item?')) 
           {
            deleteAdvising(cell.row.original)
           }}
            }>❌</button>
          </div>
        )
     },
    {
        Header: "First Name",
        accessor: "FirstName"
    },
    {
        Header: "Last Name",
        accessor: "lastName"
    },
    {
        Header: "Student ID",
        accessor: "userID"
    },
    {
        Header: "Date Assigned",
        accessor: "dateOfAppointment"
    }
   ], [])

   var initialState = ""
   if(!privs.isAdmin){
     initialState = {hiddenColumns: ['Actions']}
   }
   for(const i in myAdvisees){
    myAdvisees[i].dateOfAppointment = myAdvisees[i].dateOfAppointment.substring(0, 10)
  }
   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data: myAdvisees, initialState})


        return(

            <div className="table-center">
            <h1 className="text-align">My Advisees</h1>
        {privs.isAdmin && <button onClick={() => {addAdvisee()}}>Add Advising ➕</button>}   
         <Table size="sm" striped bordered hover {...getTableProps()}>
    <thead>
        { headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>
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
    </div>
    );
}