import { useState, useEffect} from 'react';
import {useSortBy, useTable} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import dbUtil from '../../utilities/dbUtil';
import checkPrivs from "../../utilities/checkPrivs";
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form'


    export default function AttendenceTable({row, classList}){
    const[attList, setAttList] = useState([]);

    let privs = checkPrivs()
    let history = useHistory()

    const CRN = row.location.state.CRN 

    var inAttendence = []

    useEffect(() =>{
            getAttendence();
    }, [])


    async function getAttendence(){
        const response = await dbUtil.getAttendence(CRN);
        setAttList(response)
    }

    async function updateAttendence(studentID){
        var dates = []
        var response = ""
        for(const i in attList){
            dates.push(attList[i].meetingDate)
        }
        dates = dates.filter(onlyUnique)
        for(const i in dates){
            response = await dbUtil.createAttendence(CRN, studentID, dates[i])
        }
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      
    
    async function addMeeting(){
        var response = ""
       const date = window.prompt("Enter Meeting Date", "YYYY-MM-DD")
       if(!date){return("")}
       for(const i in classList){
        response = await dbUtil.createAttendence(CRN, classList[i].studentID, date);
        if(response.err){
            console.log(response)
            window.alert("Check date format")
            return("")
        }
       }
       window.location.reload(false)
    }

    async function deleteMeeting(){
        var response = ""
       const date = window.prompt("Enter Meeting Date", "YYYY-MM-DD")
       if(!date){return("")}
        response = await dbUtil.deleteAttendence(date);
        if(response.err){
          console.log(response.err)
            window.alert("No meeting with that date")
            return("")
        }
       window.location.reload(false)
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

        for(const i in attList){
            attList[i].meetingDate = attList[i].meetingDate.substring(0, 10)
            inAttendence.push(attList[i].userID)
          }

          for(const i in classList){
            if(!inAttendence.includes(classList[i].studentID)){
                 updateAttendence(classList[i].studentID);
            }
        }

      var initialState = {hiddenColumns: ['presentOrAbsent']}
   
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: attList, initialState}, useSortBy)

    

    return(<div  className="table-center">
        <h5>Click column to sort</h5>
        {privs.isAdmin && <button onClick={() => {addMeeting()}}>➕ Add Meeting</button>}
        {privs.isAdmin && <button onClick={() => {deleteMeeting()}}>❌ Delete Meeting</button>}
        <button onClick={() => {window.location.reload(false)}}>🔄  Refresh Attendence</button>
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