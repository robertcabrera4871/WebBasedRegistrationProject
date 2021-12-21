import { useState, useEffect} from 'react';
import {useTable} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import dbUtil from '../../utilities/dbUtil';
import AttendenceTable from './AttendenceTable';
import checkPrivs from "../../utilities/checkPrivs";
import decryptUser from "../../utilities/decryptUser";
import timeWindow from '../../utilities/timeWindow';
import funcs from '../../utilities/timeWindowFunc';
import globalDate from '../../utilities/globalDate';

    export default function ClassListTable(row){
    const[classList, setClassList] = useState([]);
    var user = decryptUser();
    let privs = checkPrivs();

    const grades = ['A', 'B', 'C', 'D', 'F', 'IP'];


    useEffect(() =>{
        getClassList();
    }, [])


    // if(privs.isAdmin){user.userID = adminAccess.location.state}

    console.log(row.location.state.CRN)
    async function getClassList(){
        const response = await dbUtil.getClassList(row.location.state.CRN);
        if(response.err){
          console.log(response.err)
        }
        console.log(response)
        setClassList(response)
    }

    async function assignGrade(row){
      const timeRes = await timeWindow(funcs.finalExams, false);
      console.log(timeRes)
      if(!timeRes){return("")}

       const newGrade = window.prompt("Enter Grade")
       if(!grades.includes(newGrade)){
           window.alert(`Valid entries are ${grades}`)
           return("")
       }       
       const response = await dbUtil.assignGrade(row.studentID, newGrade);
       console.log("here")
       window.location.reload(false)
    }


    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 100,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => assignGrade(cell.row.original)}>📖 Edit Grade</button>
              </div>
            )
          },
        {
            Header: "CRN",
            accessor: "CRN",
         },
         {
            Header: "Enroll Date",
            accessor: "enrollDate",
         },
         {
            Header: "Grade",
            accessor: "grade",
         },
         {
            Header: "Student First Name",
            accessor: "firstName",
         },
         {
            Header: "Student Last Name",
            accessor: "lastName",
         }
    ], [])

    // var initialState = ""
    // if(title !== "Drop Classes"){
    //   initialState = {hiddenColumns: ['Actions']}
    // }

    for(const i in classList){
        classList[i].enrollDate = classList[i].enrollDate.substring(0, 10)
      }
  

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: classList})

    

    return(<div className="table-center">
    <h1 className="text-align">Class List</h1>   
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
<h1 className="text-align">Attendence</h1>   

<AttendenceTable row={row} classList={classList}/>
    </div>)
    }