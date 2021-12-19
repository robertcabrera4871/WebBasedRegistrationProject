import React, { useState, useEffect} from "react";
import dbUtil from "../../utilities/dbUtil";
import { useTable, useSortBy  } from "react-table";
import Table from 'react-bootstrap/Table'
import formatDate from "../../utilities/formateDate";
import checkPrivs from "../../utilities/checkPrivs";
import { useHistory } from "react-router-dom";
import funcs from "../../utilities/timeWindowFunc";
import globalDate from "../../utilities/globalDate";

export default function CalendarTable(semesterSelect){

    const [calendar, setCalendar] = useState([])

    let privs = checkPrivs()
    let history = useHistory()
    let fallUndeletable = ['ADD/DROP CLASSES', 'FIRST DAY OF CLASSES', 'SPRING REGISTRATION FOR SENIORS', 'SPRING REGISTRATION FOR JUNIOR', 
    'SPRING REGISTRATION FOR SOPHOMORES', 'SPRING REGISTRATION FOR FIRST YEAR STUDENTS', 'FINAL EXAMS', 'FALL SEMESTER ENDS']
    let springUndeleatable = ['ADD/DROP CLASSES', 'FIRST DAY OF CLASSES', 'FALL REGISTRATION FOR SENIORS', 'FALL REGISTRATION FOR JUNIOR', 
    'FALL REGISTRATION FOR SOPHOMORES', 'FALL REGISTRATION FOR FIRST YEAR STUDENTS',  'FINAL EXAMS', 'SPRING SEMESTER ENDS']
    const moment = require('moment');
   
    useEffect(() =>{
        getCalendar();

    }, [semesterSelect] );

    var semesterChosen = semesterSelect.semesterSelect;

    async function getCalendar(){
        var data = ""
        if(semesterChosen === "Fall 2021"){
            data = await dbUtil.getFallCal()
        }else if(semesterChosen === "Spring 2022"){
            data = await dbUtil.getSpringCal()
        }
        if(!data.err){
            setCalendar(data)
        }
    }
    async function deleteEvent(row){
      var res  = ""
      var semester =  getSemester();
      console.log(semester)
      if(window.confirm("Are you sure you want to delete")){
         res = await dbUtil.deleteCalEvent(row.Title, semester)
      } else{
        return("")
      }
      if(!res.err){
        window.location.reload(false)
      }
        console.log(res)
        window.alert(res.err.sqlMessage)
      }
      
    async function editDescription(row){
        var semester = getSemester
        const desc = window.prompt('Enter new description')
        if(desc === null){return("")}
        const res = await dbUtil.editCalDesc(row.Title, desc, semester)
        if(res.err){
            window.alert("Operation failed")
        }
        console.log(res)
    }

    async function editDate(row){
      const semester = getSemester(semesterChosen)
      var calendar = ""
      if(semester === "Fall"){
        calendar = await dbUtil.getFallCal()
      } else {
        calendar = await dbUtil.getSpringCal()
      }


      const date = window.prompt("Enter new date YYYY-MM-DD for " + row.Title);
      var canEdit = false;

      if(moment(date, "YYYY-MM-DD", true).isValid()){
        switch(row.Title){
          case funcs.addDrop: if(date <= await getDate(calendar, funcs.firstDay)){canEdit = true}break;
          //Fall Specific
          case funcs.firstDay: if(semester === "Fall" && date < await getDate(calendar, funcs.springRegSen) && date >= await getDate(calendar, funcs.addDrop))  {canEdit = true}break;
          case funcs.springRegSen: if(date < await getDate(calendar, funcs.springRegJun) && date > await getDate(calendar, funcs.firstDay))                      {canEdit = true}break;
          case funcs.springRegJun: if(date < await getDate(calendar, funcs.springRegSop) && date > await getDate(calendar, funcs.springRegSen))                 {canEdit = true}break;
          case funcs.springRegSop: if(date < await getDate(calendar, funcs.springRegFirst) && date > await getDate(calendar, funcs.springRegJun))               {canEdit = true}break;
          case funcs.springRegFirst: if(date < await getDate(calendar, funcs.finalExams) && date >await  getDate(calendar, funcs.springRegSop))                 {canEdit = true}break;
          case funcs.finalExams: if(semester === "Fall" && date < await getDate(calendar, funcs.fallSemEnd) &&
           date > await getDate(calendar, funcs.springRegFirst))                                                                                      {canEdit = true}break;
          //Spring Specific
          case funcs.firstDay: if(semester === "Spring" && date < await getDate(calendar, funcs.fallRegSen) && 
          date >= await getDate(calendar, funcs.addDrop))                                                                                             {canEdit = true}break;
          case funcs.fallRegSen: if(date < await getDate(calendar, funcs.fallRegJun) && date > await getDate(calendar, funcs.firstDay))                         {canEdit = true}break;
          case funcs.fallRegJun: if(date < await getDate(calendar, funcs.fallRegSop) && date > await getDate(calendar, funcs.fallRegSen))                       {canEdit = true}break;
          case funcs.fallRegSop: if(date < await getDate(calendar, funcs.fallRegFirst) && date > await getDate(calendar, funcs.fallRegJun))                     {canEdit = true}break;
          case funcs.fallRegFirst: if(date < await getDate(calendar, funcs.finalExams) && date > await getDate(calendar, funcs.fallRegSop))                     {canEdit = true}break;
          case funcs.finalExams: if(semester === "Spring" && date < await getDate(calendar, funcs.springSemEnd) 
          && date > await getDate(calendar, funcs.fallRegFirst) )                                                                                     {canEdit = true}break;
          
        }
    }

      if(canEdit){
        const res = await dbUtil.updateCalDate(row.Title, date, semester)
        if(!res.err){
          window.location.reload(false)
        }
        else{
          window.alert(res.err)
          console.log(res)
        }
      }
      return("")
    }

    function changeDate(){
      const date = window.prompt("Enter new date")
      if(moment(date, "YYYY-MM-DD", true).isValid())
      {
        globalDate.setGlobalDate(date)
        window.location.reload(false)
      }else{
        window.alert("Not a valid date")
      }

    }

    async function getDate(calendar, func){
      return(
        calendar.find(x => x.Title === func).Date
      )
    }

     function getSemester(){
          if(semesterChosen === 'Fall 2021'){
            return('Fall')
        } else{
            return('Spring')
          }
    }

    function checkUndeletable(row){
        if(semesterSelect.semesterSelect === "Fall 2021"){
            return !fallUndeletable.includes(row.Title)
        }
        if(semesterSelect.semesterSelect === "Spring 2022"){
            return !springUndeleatable.includes(row.Title)
        }
        return true
    }

    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 100,
            Cell: ({cell}) => (
                
              <div id="parent">
             { privs.isAdmin && history.location.pathname !="/home" &&  <button className="child" title="Edit Description" onClick={() => editDescription(cell.row.original)}>✏️</button>}
             { privs.isAdmin && history.location.pathname !="/home" &&  <button className="child" title="Edit Date" onClick={() => editDate(cell.row.original)}>🕖</button>}
             { privs.isAdmin && history.location.pathname !="/home" &&  checkUndeletable(cell.row.original) &&
             <button className="child"  onClick={() => {deleteEvent(cell.row.original)}}>❌</button>}

              </div>
            )
          },
        {
            Header: "Date",
            id:'date',
            accessor: "Date",
            sortMethod: (a, b) => {
                var a1 = new Date(a).getTime();
                var b1 = new Date(b).getTime();
              if(a1<b1)
              return 1;
              else if(a1>b1)
              return -1;
              else
              return 0;
              }
        },
        {
            Header: "Title",
            accessor: "Title"
        },
        {
            Header: "Description",
            accessor: "Description"
        }
    ], [semesterSelect])

    formatDate(calendar, 'Date')


    var initialState = {
        sortBy: [
            {
                id: 'date',
                desc: false
        }
            
        ]
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data: calendar, initialState}, useSortBy)




    return(
        <div className='table-center'>
        <h1 className='text-align'>Academic Calendar</h1>    
        {privs.isAdmin && 
        <div>
        <h3>Current Date: {globalDate.getGlobalDate()}</h3>
        {history.location.pathname === '/timeWindow' && <button onClick={() => changeDate()}>Change Date 📅</button>}
        </div>
        }
        <Table size="sm" striped bordered hover {...getTableProps()}>
     <thead>
       { headerGroups.map(headerGroup => (
         <tr {...headerGroup.getHeaderGroupProps()}>
           {headerGroup.headers.map(column => (
             <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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