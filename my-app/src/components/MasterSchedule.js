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
import timeWindow from "../utilities/timeWindow";
import funcs from "../utilities/timeWindowFunc";



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

     
     function getSchedule(){
      dbUtil.getMasterSchedule().then(
          data =>{
             if(history.location.pathname==="/teachSchedule"){
                data = data.filter(row => row.userID === user.userID)
             }
              if(semesterSelect === "Fall 2021"){
                data = data.filter(item => (item.semesterYearID === "F21"))
             }
             else if(semesterSelect === "Spring 2022"){
                data = data.filter(item => (item.semesterYearID === "S22"))
             }
             setSchedule(data)
          }
      )
   }
     
     async function addClassStudent(row){
      const student = await dbUtil.getStudent(user.userID)
      if(await checkPreReq(row.courseID, user.userID)){window.alert("You have not completed the prerequisite"); return("")}
      if(await checkDoubleCourse(row.courseID, user.userID)){window.alert("You have already enrolled in this course"); return("")}
      if(await checkAlreadyComplete(row.CRN, user.userID)){window.alert("You have already taken this class"); return("")}
      if(row.availableSeats === 0){window.alert("Class is full"); return("")}
      if(await checkGradUndergrad(row, student)){return("")}  
      if(await yearLevelCheck(student)){return("")}
      if(await creditCheck(row, student)){return("")}
      

      if(!privs.isAdmin){
         if(await yearLevelCheck(student)){return("")}
         if(await addClassTimeCheck()){return("")}}

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

     async function checkPreReq(courseID, userID){
      const prereq = await getPrereqByID(courseID);
      if(prereq !== undefined){
         const res = await dbUtil.checkPreReq(prereq, userID)
         if(res.err){
            window.alert(res.err.sqlMessage)
            return true
         }else if(res.length === 0){
             return true
         }
         return false
        } 
        return false
      }

      

     

     async function getPrereqByID(courseID){
      const res = await dbUtil.getPrereqByID(courseID)
      if(res.err){
          window.alert(res.err.sqlMessage)
          console.log(res.err)
      }
      return(res[0]?.prereqCourseID)
}

     async function checkDoubleCourse(courseID, userID){
        const res = await dbUtil.checkDoubleCourse(courseID, userID)
        if(res.err){
           window.alert(res.err.sqlMessage)
           return true
        }else if(res.length !== 0){
            return true
        }
        return false
     }

     async function checkAlreadyComplete(CRN, userID){
        const res = await dbUtil.checkStudentHistory(userID, CRN)
        if(res.err){
           window.alert(res.err.sqlMessage)
           console.log(res)
           return true
        }else if(res.length !== 0 ){
           return true
        }
        return false
     }

     async function creditCheck(row, student){
      const minMax = await dbUtil.creditCheck(student[0].studentID)
      const credTaking = await dbUtil.getCreditsTaking(student[0].studentID)
      console.log(minMax)
      const maxCredit = (minMax[0].maxCredit)
      const newClassCred = row.numOfCredits
      const currentCreds = credTaking[0]?.numOfCredits
      if(currentCreds + newClassCred > maxCredit){
         window.alert("You are taking too more than your maximum credits")
         return(true)
      }
      return(false)      
   }


     async function addClassTimeCheck(){
      const res = (await timeWindow(funcs.addDrop, false))
      return(!res)
     }

     async function yearLevelCheck(res){
      if(res[0].studentType === 'Grad Student'){
         return false
      } 

      if(semesterSelect === 'Fall 2021'){
      switch(res[0].yearLevel.toLowerCase()){
         case 'freshman':{
            if(!(await timeWindow(funcs.springRegFirst, false)  )){return(true)}
         }
         case 'sophmore':{
            if(!(await timeWindow(funcs.springRegSop, false)  )){return(true)}
         }
         case 'junior': {
            if(!(await timeWindow(funcs.springRegJun, false)  )){return(true)}

         }
         case 'senior': {
            if(!(await timeWindow(funcs.springRegSen, false)  )){return(true)}

         }
      }}
      else if(semesterSelect === 'Spring 2022'){
         switch(res[0].yearLevel.toLowerCase()){
            case 'freshman':{
               if(!(await timeWindow(funcs.fallRegFirst, false)  )){return(true)}
            }
            case 'sophmore':{
               if(!(await timeWindow(funcs.fallRegFirst, false)  )){return(true)}
            }
            case 'junior': {
               if(!(await timeWindow(funcs.fallRegJun, false)  )){return(true)}
   
            }
            case 'senior': {
               if(!(await timeWindow(funcs.fallRegSen, false)  )){return(true)}
   
            }
         }}

         return false

      }

     async function checkGradUndergrad(row, res){
         if(res[0].studentType === 'Undergrad Student' && row.CRN.charAt(0) === '3'){
            window.alert("Cannot register: Undergrad to Grad")
            return true
         }else if(res[0].studentType === 'Grad Student' && row.CRN.charAt(0) === '2'){
            if(window.confirm("You are a Graduate registering for an Undergrad, are you sure you wish to add?")){
               return false
            }
            return true
         }
         return false
     }


     async function addClassTeach(){
      if(await courseMaxCheck()){return("")}
       const CRN = window.prompt("Enter CRN of Class you wish to add")
      const response = await dbUtil.addTeachClass(CRN, user.userID); 
      console.log(response)
      if(response.err){
         window.alert("Teacher is already teaching this class")
      } else if(response.affectedRows === 1){
         window.alert("Teacher is assigned")
         window.location.reload(false);
      }
   }

   async function dropTeacher(row){
      if(await courseMinCheck()){return("")}
      if(window.confirm("Are you sure you wish to delete this item?")){
         const res = await dbUtil.addTeachClass(row.CRN, "TBD");
         if(res.err){
            window.alert(res.err.sqlMessage)
            return("")
         }
         window.alert("Teacher Dropped")
         window.location.reload(false)
      }
   
   }

   async function courseMinCheck(){
      const minMax = await dbUtil.courseMinMaxCheck(user.userID)
      const currentTeaching = await getCoursesTeaching(user.userID)
      const minCourse = minMax[0].minCourse;
      if(currentTeaching - 1 < minCourse){
         window.alert("This teacher is at there minimum courses")
         return true
      }
      return false
      
   }
 

   async function courseMaxCheck(){
      const minMax = await dbUtil.courseMinMaxCheck(user.userID)
      console.log(minMax)

      const currentTeaching =  await getCoursesTeaching(user.userID)
      const maxCourse = minMax[0].maxCourse;

      if(currentTeaching + 1 > maxCourse){
         window.alert("This teacher is at there max courses")
         return true
      }
      return false
      
   }

   async function getCoursesTeaching(userID){
      const res = await dbUtil.getCoursesTeaching(userID)
      if(res.err){
          window.alert(res.err.sqlMessage)
          console.log(res)
      }
      return res
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

   function homeSchedule(){
      if(history.location.pathname === '/home'){
         return 'table-center'
      }else{
         return ""
      }


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
                           <div id='parent'>
                              {privs.isAdmin && <button onClick={() => {dropTeacher(cell.row.original)}} className="child" title="Drop Teacher">❌</button>}
                              <button className="child" title="Class List" onClick={() =>redirectClassList(cell.row.original)}>📋</button>
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

         <div className={homeSchedule()}>
         <b>Hover column to search, Click column to sort</b>

      <Table  size="sm" striped bordered hover {...getTableProps()}>

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
   
    </div>
 )
}
