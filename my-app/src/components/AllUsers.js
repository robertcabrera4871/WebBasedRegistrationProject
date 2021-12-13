import React, { useState, useEffect} from "react";
import { useTable,usePagination } from "react-table";
import dbUtil from '../utilities/dbUtil'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router';
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Dropdown from 'react-bootstrap/Dropdown'


export default function AllUsers(){

    const [users, setUsers] = useState([]);
    let history = useHistory();

    
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

  
    function forwardAdd(chosenType){
      history.push({
        pathname: '/addUser',
        state: chosenType
      })
    }

    

    function forwardEdit(user){
      history.push({
        pathname: '/editUser',
        state: user
      })
    }
    async function deleteUser(row){
      if(window.confirm("Are you sure you want to delete this user?")){
        const response = await dbUtil.deleteUser(row.userID)
        if(!response.err){
          window.location.reload(false);
        }
      }
    }
    async function assignHold(holdID, userID){
       var response = ""
      if(window.confirm("Are you sure you want to add hold?")){
        response = await dbUtil.assignHold(holdID, userID)
      }
      if(!response.err){
        window.alert("Hold Added Succesfully")
      }
      if(response.err){
        window.alert("Hold already exists")
        console.log(response)
      }
    }

     function viewStudentHolds(userID){
      history.push({
        pathname: '/viewHolds',
        state: userID
      })
    }

    function viewStudentAdvisor(userID){
      history.push({
        pathname: '/advisors',
        state: userID
      })
    }
    function viewFacAdvisees(userID){
      history.push({
        pathname: '/advisees',
        state: userID
      })
    }

     const data = users;

     const columns = React.useMemo( () =>[
      {
        accessor: 'Actions',
        width: 100,
        Cell: ({cell}) => (
          <div>
          {cell.row.original.userType !== "guest" && 
          <Dropdown >
          <DropdownToggle as={"button"} title={"Assign Hold"}>🛠️ Actions</DropdownToggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={() => forwardEdit(cell.row.original)}> ✏️ Edit </Dropdown.Item>
          <Dropdown.Item  onClick={() => deleteUser(cell.row.original)}> ❌ Delete </Dropdown.Item>
          {(cell.row.original.userType === "Faculty") && 
           <Dropdown.Item onClick={() =>{viewFacAdvisees(cell.row.original.userID)}}>👨‍🎓 View Advisees</Dropdown.Item>
           }
          {(cell.row.original.userType).includes("Student") &&
          <Dropdown>
          <DropdownToggle as={"Dropdown.Item"} title={"Assign Hold"}>&nbsp;&nbsp;&nbsp;&nbsp;🎫 Add Hold</DropdownToggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => {assignHold('LH001', cell.row.original.userID)}}>Library Hold</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {assignHold('FH002', cell.row.original.userID)}}>Financial aid Hold</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {assignHold('HH003', cell.row.original.userID)}}>Health Hold</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {assignHold('RH004', cell.row.original.userID)}}>Registration Hold</Dropdown.Item>
        </Dropdown.Menu>
        <Dropdown.Item onClick={() =>{viewStudentHolds(cell.row.original.userID)}}>🎟️ View Holds</Dropdown.Item>
        <Dropdown.Item onClick={() =>{viewStudentAdvisor(cell.row.original.userID)}}>🤝🏻 View Advisors</Dropdown.Item>
          </Dropdown> }
          </Dropdown.Menu>
          </Dropdown>} </div>
        )
      },
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

     for(const i in data){
      data[i].DOB = data[i].DOB.substring(0, 10)
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
     } = useTable({ columns, data }, usePagination)
      

     const {pageIndex} = state
     
    return(
      <div className='table-center'>
        <h1 className='text-align'>All Users</h1>
        <DropdownButton id='dropdown' title={'Add User'}>
            <DropdownItem onClick={(e) => {forwardAdd('Undergrad Student')}}>Undergrad Student</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('Grad Student')}}>Grad Student</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('Admin')}}>Admin</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('Faculty')}}>Faculty</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('ResearchStaff')}}>ResearchStaff</DropdownItem>
        </DropdownButton>
        <Table size="sm" striped bordered hover {...getTableProps()}>
      <thead>
        {// Loop over the header rows
        headerGroups.map(headerGroup => (
          // Apply the header row props
          <tr {...headerGroup.getHeaderGroupProps()}>
            {// Loop over the headers in each row
            headerGroup.headers.map(column => (
              // Apply the header cell props
              <th {...column.getHeaderProps({
                style: {width: column.width}
              }
              )}>
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
        page.map(row => {
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
    <span className='align-center'>
       Page{' '}
       <strong>
          {pageIndex + 1} of {pageOptions.length}
       </strong>
       <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
       <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
    </span>
        </div>
    );
}
