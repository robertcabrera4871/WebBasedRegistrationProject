import React, { useState, useEffect} from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import dbUtil from '../utilities/dbUtil';
import Table from 'react-bootstrap/Table';
import ColumnFilter from "./tableComponents/ColumnFilter";
import { useHistory } from 'react-router';
import checkPrivs from '../utilities/checkPrivs';
import ChoseSemester from "./subComponents/ChoseSemester";
import decryptUser from "../utilities/decryptUser";
import Dropdown from 'react-bootstrap/Dropdown'
import CalendarTable from "./tableComponents/CalendarTable";



export default function MasterSchedule(){

    const [schedule, setSchedule] = useState([]);
    const [semesterSelect, setSemester]= useState("Fall 2021")
    let history = useHistory();
    const privs = checkPrivs();
    var user = decryptUser();

    if(history.location.state !== undefined){
       user.userID = history.location.state
    }


     useEffect(() =>{
         getSchedule();
     }, [semesterSelect]
     );

     
     function choseSemester (semesterChosen) {
         setSemester(semesterChosen) 
         getSchedule()
     }

     async function addClassStudent(row){
        if(await checkAvailableSeats(row)){return("")}
        const response = await dbUtil.addMyClass(row.CRN, user.userID); 
        if(response.err){
           console.log(response)
           window.alert("You are already enrolled in this class")
        } else{
           window.alert("You have been enrolled")
           const res = await dbUtil.minusAvailableSeats(row.CRN)
           if(res.err){
              window.alert(res.err)
           }else{
            window.location.reload(false)
           }
        }
     }

     async function checkAvailableSeats(row){
        const res = await dbUtil.checkAvailableSeats(row.CRN)
        if(res.err){
           window.alert(res.err)
           console.log(res)
           return true
        }else if(res[0].availableSeats === 0 ){
           window.alert("Class is full")
           return true
        }
        return false;
     }


     async function addClassTeach(){
       const CRN = window.prompt("Enter CRN of Class you wish to add")
      const response = await dbUtil.addTeachClass(CRN, user.userID); 
      if(response.err){
         window.alert("Teacher is already teaching this class")
      } else if(response.affectedRows === 1){
         window.alert("Teacher is assigned")
         window.location.reload(false);
      }
   }
 
 
      function getSchedule(){
        dbUtil.getMasterSchedule().then(
            data =>{
               if(history.location.pathname==="/teachSchedule"){
                  data = data.filter(row => row.userID === user.userID)
               }
                if(semesterSelect === "Fall 2021"){
                   console.log(data)
                  data = data.filter(item => (item.semesterYearID === "F21"))
               }
               else if(semesterSelect === "Spring 2022"){
                  data = data.filter(item => (item.semesterYearID === "S22"))
               }
               setSchedule(data)
            }
        )
     } 


     function newRow(startNum){
        history.push({
           pathname: '/addMS',
           state: startNum
         })
     }
     function editRow(rowData){
      history.push({
         pathname: '/editMS', 
         state: rowData
      })
   }
   function addCourse(){
      history.push({
          pathname: '/AddCourse'
       })
   }
   

     async function deleteCS(row){
         const deleteResponse = await dbUtil.deleteMS(row);
         var unenrollDeleteRes = ""
         var finalDeleteRes = ""
         if(deleteResponse.err){
            if(window.confirm("There are students enrolled in this course. Delete Anyways?")){
               unenrollDeleteRes = await dbUtil.unenrollAll(row);
               finalDeleteRes = await dbUtil.deleteMS(row)
               window.location.reload(false);
            }
        }else{
         window.location.reload(false);
        }


     }

     function redirectClassList(row){
        history.push({
           pathname: "/classList",
           state: row
        })
     }
      
     
      const columns = React.useMemo( () => [
        {
            Header: "CRN",
            accessor: "CRN",
            Filter: ColumnFilter
         },

         {
            Header: "Section",
            accessor: "sectionNum",
            Filter: ColumnFilter
         },
         {
            Header: "Credits",
            accessor: "numOfCredits",
            Filter: ColumnFilter
         },
         {
            Header: "CourseID",
            accessor: "courseID",
            Filter: ColumnFilter
         },
         {
            Header: "Day",
            accessor: "day",
            Filter: ColumnFilter
         },
         {
            Header: "Start Time",
            accessor: "startTime",
            Filter: ColumnFilter
         },
         {
            Header: "End Time",
            accessor: "endTime",
            Filter: ColumnFilter
         },

         {
            Header: "Semester",
            accessor: "semesterYearID",
            Filter: ColumnFilter
         },
         {
            Header: "Room",
            accessor: "roomID",
            Filter: ColumnFilter
         },
         {
            Header: "Prof Last Name",
            accessor: "lastName",
            Filter: ColumnFilter
         },
         {
            Header: "Prof First Name",
            accessor: "firstName",
            Filter: ColumnFilter
         },
         {
            Header: "Seats",
            accessor: "availableSeats",
            Filter: ColumnFilter
         },
         {
            Header: "Capacity",
            accessor: "capacity",
            Filter: ColumnFilter
         }

    ], []);
      
    
    var initialState = ""
    if(history.location.pathname === "/teachSchedule"){
      initialState = {hiddenColumns: ['firstName', 'lastName']}
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
      } = useTable({ columns, data: schedule, initialState},
          useFilters, useSortBy, usePagination,
          (hooks) => {
            if(privs.isAdmin && history.location.pathname === "/home" ){
            hooks.visibleColumns.push((columns) => {
               return [
                  {
                     id: 'edit',
                     Cell: ({row}) => (
                        <div>
                        <button className='editButton' onClick={() => editRow(row.original)}>✏️</button>
                        <div className='buttonDivider'/>
                        <button className='delete-button' onClick={(e) => { 
                           if (window.confirm('Are you sure you wish to delete?')) 
                           {
                              deleteCS(row.original)
                           } }}>❌</button>
                        </div>
                     ) 
                  }, 
                  ...columns
                  ]
            })}
             if(history.location.pathname === "/schedule" || history.location.pathname === "/addClass") {
               hooks.visibleColumns.push((columns) =>{
                  return[
                      { 
                        id: "addClassStudent",
                        Cell: ({cell}) => (
                           <div>
                              <button title="Add to Schedule" onClick={() =>addClassStudent(cell.row.original)}>➕</button>
                           </div>
                        )
                     },
                     ...columns
                  ]
               })
            }
             if(history.location.pathname === "/teachSchedule"){
               hooks.visibleColumns.push((columns) =>{
                  return[
                      { 
                        id: "addClassTeach",
                        Cell: ({cell}) => (
                           <div>
                              <button title="Class List" onClick={() =>redirectClassList(cell.row.original)}>📋</button>
                           </div>
                        )
                     },
                     ...columns
                  ]
               })
            }

          })
 

         const {pageIndex} = state


     return (
      <div >
      <ChoseSemester onClick={choseSemester} semesterSelect={semesterSelect} />
      <h1 className='text-align'>{history.location.pathname==="/teachSchedule" ? "Teaching Schedule":"Master Schedule"}</h1>

      <b>Hover column to search, Click column to sort</b>
      <div id='parent'>
         { privs.isAdmin &&  history.location.pathname === "/home" &&
          <div className="child">
            <Dropdown>
          <Dropdown.Toggle>Add Course Section</Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => {newRow(2)}}>Undergrad Course Section</Dropdown.Item>
          <Dropdown.Item onClick={(e) => {newRow(3)}}>Graduate Course Section</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
         </div>}
         <div className = "child">&nbsp;&nbsp;&nbsp;&nbsp;</div>
         {privs.isAdmin && history.location.pathname === '/home' && <button className="child" onClick={() =>{addCourse()}}>➕ Add Course</button>}
         {privs.isAdmin && history.location.pathname === '/teachSchedule' && <button onClick={() =>addClassTeach()}>➕ Add Teacher to Class</button>}
         </div>
      
      <Table size="sm" striped bordered hover {...getTableProps()}>
      <thead>
        { headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className='column'{...column.getHeaderProps(column.getSortByToggleProps())}>
                { column.render('Header')}
                <span>{column.isSorted ? (column.isSortedDesc ?  ' 🔽' : ' 🔼' ) : ''}</span>
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
      {(history.location.pathname === "/home") && <CalendarTable semesterSelect={semesterSelect}/>}
    </div>
 )
}
