import React, { useState, useEffect} from "react";
import { useTable, usePagination, useFilters, useSortBy } from "react-table";
import dbUtil from '../utilities/dbUtil'
import Table from 'react-bootstrap/Table'
import { useHistory } from 'react-router';
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import Dropdown from 'react-bootstrap/Dropdown'
import checkPrivs from "../utilities/checkPrivs";
import ColumnFilter from "./tableComponents/ColumnFilter";
import timeWindow from "../utilities/timeWindow";
import funcs from "../utilities/timeWindowFunc";


export default function AllUsers(){

    const [users, setUsers] = useState([]);
    let history = useHistory();
    let privs = checkPrivs();
   

    
    useEffect(() =>{
        getUsers();
          }, []
    );

    async function getUsers(){
        var res = await dbUtil.getAllUsers()
        res = res.filter(item => (item.userID.toLowerCase() !== "guest"))
        res = res.filter(item => (item.userID.toLowerCase()  !== "TBD"))
        if(privs.isFaculty){
          res = res.filter(item => (item.userType === "Grad Student" || item.userType === "Undergrad Student"))
        }
          setUsers(res)
      
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
        if(await deleteSAttendance(row)){return("")}
        if(await deleteSHistory(row)){return("")}
        if(await dropClasses(row)){return("")}
        const response = await dbUtil.deleteUser(row.userID)
        console.log(response)
        if(!response.err){
          window.location.reload(false);
        }
        if(response.err){
          window.alert(response.err.sqlMessage)
        }
      }
    }
    async function deleteSAttendance(row){
      const res = await dbUtil.deleteAttendenceByID(row.userID)
      if(res.err){
        window.alert(res.err.sqlMessage)
        console.log(res.err, "attendance err")
        return true
      }
      return false
    }
    async function dropClasses(row){
      const res = await dbUtil.dropAllClasses(row.userID)
        if(res.err){
          window.alert(res.err.sqlMessage)
          console.log(res, "class error")
          return true
        }
        return false
  }
    async function deleteSHistory(row){
      const res = await dbUtil.deleteAllStudentHistory(row.userID)
        if(res.err){
          window.alert(res.err.sqlMessage)
          console.log(res, "history err")
          return true
        }
        return false
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
    async function viewFacAdvisees(userID){
      if(await checkOther(userID)){
      history.push({
        pathname: '/advisees',
        state: userID
      })}
      else{
        window.alert("This faculty member is not a teacher")}
    }

   async function viewFacSchedule(userID){
    if(await checkOther(userID)){
      history.push({
        pathname: '/teachSchedule',
        state: userID
      })}
      else{
        window.alert("This faculty member is not a teacher")}
    }
    async function viewFacHistory(userID){
      if(await checkOther(userID)){
      history.push({
        pathname: '/facHistory',
        state: userID
      })}else{
      window.alert("This faculty member is not a teacher")}
    }


    function viewStudentSchedule(userID){
      history.push({
        pathname: '/schedule',
        state: userID
      })
    }
    function viewSMajorMinor(userID){
      history.push({
        pathname: '/addMajorMinor',
        state: userID
      })
    }
    function viewSDegreeAudit(userID){
      history.push({
        pathname: '/degreeAudit',
        state: userID
      })
    }



    async function checkOther(userID){
      const res = await dbUtil.getFacRank(userID)
      console.log(res)
      if(res[0].rank === 'other'){
        console.log(res[0].rank === "other")
        return false
      }
      return true;
    }


     const columns = React.useMemo( () =>[
      {
        accessor: 'Actions',
        width: 100,
        Cell: ({cell}) => (<div>
          {privs.isAdmin && <div>
          {cell.row.original.userType !== "guest" && 
          <Dropdown >
          <DropdownToggle as={"button"} title={"Assign Hold"}>🛠️ Actions</DropdownToggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={() => forwardEdit(cell.row.original)}> ✏️ Edit </Dropdown.Item>
          <Dropdown.Item  onClick={() => deleteUser(cell.row.original)}> ❌ Delete </Dropdown.Item>
          {(cell.row.original.userType === "Faculty")  && 
          <>
           <Dropdown.Item onClick={() =>{viewFacAdvisees(cell.row.original.userID)}}>👨‍🎓 View Advisees</Dropdown.Item>
           <Dropdown.Item onClick={() =>{viewFacSchedule(cell.row.original.userID)}}>📅 View Schedule</Dropdown.Item>
           <Dropdown.Item onClick={() =>{viewFacHistory(cell.row.original.userID)}}>📜 View History</Dropdown.Item>
           </>
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
        <Dropdown>
          <DropdownToggle as={"Dropdown.Item"} title={"Student Academics"}>&nbsp;&nbsp;&nbsp;&nbsp;🎓 Academics</DropdownToggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => {viewStudentSchedule(cell.row.original.userID)}}>Schedule</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {viewSMajorMinor( cell.row.original.userID)}}>Major/Minor</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {viewSDegreeAudit( cell.row.original.userID)}}>Degree Audit</Dropdown.Item>
        </Dropdown.Menu>
          </Dropdown>
          </Dropdown> }
          </Dropdown.Menu>
          </Dropdown>} </div>}
          {privs.isFaculty && <div>
            <button title="Degree Audit"onClick={(e) => {viewSDegreeAudit( cell.row.original.userID)}}>🎓</button>
            </div>}
          </div>
        ),
        Filter: ColumnFilter
      },
        {
            Header: "User ID",
            accessor: "userID",
            Filter: ColumnFilter
        },
        {
            Header: "First Name",
            accessor: "firstName",
            Filter: ColumnFilter
        },
        {
            Header: "Last Name",
            accessor: "lastName",
            Filter: ColumnFilter
        },
        {
            Header: "DOB",
            accessor: "DOB",
            Filter: ColumnFilter
        },
        {
            Header: "City",
            accessor: "city",
            Filter: ColumnFilter
        },
        {
            Header: "State",
            accessor: "state",
            Filter: ColumnFilter
        },
        {
            Header: "Zip",
            accessor: "zipCode",
            Filter: ColumnFilter
        },
        {
            Header: "Address",
            accessor: "address",
            Filter: ColumnFilter
        },
        {
            Header: "Type",
            accessor: "userType",
            id: "typeFilter",
            Filter: ColumnFilter
        }

     ], []);

     for(const i in users){
      users[i].DOB = users[i].DOB.substring(0, 10)
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
     } = useTable({ columns, data: users, initialState: {pageSize: 20}}, useFilters, useSortBy, usePagination)
      

     const {pageIndex} = state
     
    return(
      <div className='table-center'>
        <h1 className='text-align'>All Users</h1>
        {privs.isAdmin && 
        <DropdownButton id='dropdown' title={'Add User'}>
            <DropdownItem onClick={(e) => {forwardAdd('Undergrad Student')}}>Undergrad Student</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('Grad Student')}}>Grad Student</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('Admin')}}>Admin</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('Faculty')}}>Faculty</DropdownItem>
            <DropdownItem onClick={(e) => {forwardAdd('ResearchStaff')}}>ResearchStaff</DropdownItem>
        </DropdownButton>}
        <Table size="sm" striped bordered hover {...getTableProps()}>
      <thead>
        {
        headerGroups.map(headerGroup => (
          
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              
              <th className='column'{...column.getHeaderProps()}>
                {
                column.render('Header')}
                <div className='filter'>{column.canFilter? column.render('Filter') : null }</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {
        page.map(row => {
          
          prepareRow(row)
          return (
            
            <tr {...row.getRowProps()}>
              {
              row.cells.map(cell => {
                
                return (
                  <td {...cell.getCellProps()}>
                    {
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
