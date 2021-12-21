import { useState, useEffect} from 'react';
import {useSortBy, useTable, usePagination} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import dbUtil from '../../utilities/dbUtil';
import checkPrivs from "../../utilities/checkPrivs";
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import funcs from '../../utilities/timeWindowFunc';
import Spinner from 'react-bootstrap/Spinner'


    export default function AttendenceTable({row, classList}){
    const[attList, setAttList] = useState([]);
    const[loading, setLoading] = useState(false)


    let privs = checkPrivs()
    let history = useHistory()
    const moment = require("moment");
    

    const CRN = row.location.state.CRN 
    const day = row.location.state.day;


    useEffect(() =>{
            getAttendence();
    }, [])


    async function getAttendence(){
        const response = await dbUtil.getAttendence(CRN);
        if(response.err){
          window.alert("Error getting attendence")
          return("")
        }
        response.sort(function(a, b) {
          return new Date(b.meetingDate) - new Date(a.meetingDate)
        })
    
        for(const i in response){
          response[i].meetingDate = response[i].meetingDate.substring(0, 10)
              }
        setAttList(response)
    }


    async function generateAttendance(){
      const firstLast = await getFirstLastDay()
      const meetingDates = await getDates(firstLast);
      setLoading(true)
      for(const i in classList){
        for(const x in meetingDates)
        {
          console.log(classList[i])
          var res = await dbUtil.generateAttendance(CRN, classList[i].studentID, meetingDates[x].toString());
        }
       
         if(res.err){
           console.log(res.err.sqlMessage)
         }
      }
      setLoading(false)
      window.location.reload(false);
  }

  async function getDates(firstLast){
    var result = [];
    var current = moment(firstLast.firstDay).clone();
    var end = moment(firstLast.lastDay).clone();
    var day = parseDay();
    while(current.day(7 + day).isBefore(end)){
      result.push(current.clone());
    }
    return(result.map(m => m.format('YYYY-MM-DD')));
    
  }

  function parseDay(){
    switch(day){
      case 'Monday': return 1; 
      case 'Tuesday': return 2;
      case 'Wednesday': return 3;
      case 'Thursday': return 4;
      case 'Friday': return 5;
      case 'Saturday': return 6;
      case 'Sunday': return 0;
      default: {
        window.alert("Error in day parse")
      }
    }
  }

  async function getFirstLastDay(){
    const res = await dbUtil.getSemesterFromCRN(CRN);
    if(res.err){
      window.alert(res.err.sqlMessage)
    }

    var calendar = []
    var endIndex = ""
    if(res[0].semesterYearID === 'F21'){
      calendar = await dbUtil.getFallCal();
      endIndex = calendar.map(e => e.Title).indexOf(funcs.fallSemEnd)

    }else if(res[0].semesterYearID === 'S22'){
      calendar  = await dbUtil.getSpringCal();
      endIndex = calendar.map(e => e.Title).indexOf(funcs.springSemEnd)
    }
    const firstDayIndex = calendar.map(e => e.Title).indexOf(funcs.firstDay)
    return ({
      firstDay: calendar[firstDayIndex].Date.substring(0,10),
      lastDay: calendar[endIndex].Date.substring(0,10)
    })
  }

    async function switchAttendence(id, meetingDate, presence){
        const res = await dbUtil.switchAttendence(id, meetingDate, !presence)
        if(!res.err){
          window.location.reload(false)
        }
    }


    const columns = React.useMemo(() => [
        {
          Header: "Student ID",
          accessor: "userID"
        },
        {
            Header: "Student First Name",
            accessor: "firstName",
         },
         {
            Header: "Student Last Name",
            accessor: "lastName",
         },
         {
            Header: "Meeting Date",
            accessor: "meetingDate",
         },
         {
            Header: "Pora",
            accessor: "presentOrAbsent"
         },
         {
          Header: "Attendence",
          accessor: 'Actions',
          width: 100,
          Cell: ({cell}) => (
            <Form>
            <Form.Check checked={cell.row.original.presentOrAbsent} onChange={(e) => {switchAttendence(e.target.id, cell.row.original.meetingDate, cell.row.original.presentOrAbsent)}} 
            id = {cell.row.original.userID} type ="switch" label="Absent/Present"></Form.Check>
            </Form>
          )
        },
      
    ], [])


      var initialState = {hiddenColumns: ['presentOrAbsent']}
   
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
      } = useTable({columns, data: attList, initialState}, useSortBy, usePagination)

      const {pageIndex} = state

    if(loading){
      return(
        <div>
         <Spinner animation="grow" variant="primary" />
        <span>Loading... Please do not leave page or attempt to change grades</span>
        </div>
      )
    }

    return(<div  className="table-center">
        <h5>Click column to sort</h5>
        <button onClick={() => {generateAttendance()}}>Refresh Attendance 🔄</button>
    <Table size="sm" striped bordered hover {...getTableProps()}>
  <thead>
    { headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <th {...column.getHeaderProps(column.getSortByToggleProps())}>
            { column.render('Header')}
            <span>
                {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
            </span>
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
    </div>)
    }