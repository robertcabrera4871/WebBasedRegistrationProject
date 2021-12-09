import ChoseSemester from './subComponents/ChoseSemester'
import { useState, useEffect} from 'react';
import dbUtil from '../utilities/dbUtil';
import {useTable} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import decryptUser from '../utilities/decryptUser';

export default function Schedule({title, semesterPicker}){

    const [semesterSelect, setSemester]= useState("Spring 2021")
    const [schedule, setSchedule] = useState([]);


    const choseSemester = (semesterChosen) => {
        setSemester(semesterChosen) 
    }

    useEffect(() =>{
        getUserSched();
    }, [semesterSelect]);

    var user = decryptUser();

   async function dropClass(row){
      const response = await dbUtil.dropMyClass(row.CRN, user.userID)
      if(response.err){
        window.alert(response.err.sqlMessage)
      } else {
        window.location.reload(false);
      }
   }

   if(!title){
    title = 'My Schedule';
    semesterPicker = true;
   }

    function getUserSched(){
        dbUtil.getUserSched(user.userID).then(
            data =>{
                if(title === 'Transcript'){
                    data = data.filter(item => ( item.grade !== 'IP'))
                }
                else if(title === 'My Schedule'){
                    data = data.filter(item => (item.grade === "IP") )
                }
                if(semesterSelect === "Spring 2021" && semesterPicker){
                    data = data.filter(item => (item.semesterYearID === 'spring21' ))
                 } 
                 else if(semesterSelect === "Fall 2022" && semesterPicker){
                    data = data.filter(item => (item.Semester === "Fall" && item.Year === "2021"))
                 }
                 setSchedule(data)
            }
        )
        
    }

    const columns = React.useMemo( () => [
        {
            accessor: 'Actions',
            width: 10,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => dropClass(cell.row.original)}>❌</button>
              </div>
            )
        },
        {
            Header: "CourseID",
            accessor: "CourseID",
         },
         {
            Header: "CRN",
            accessor: "CRN",
         },
         {
            Header: "Room No.",
            accessor: "roomID",
         },
         {
            Header: "Prof First Name",
            accessor: "firstName",
         },
         {
            Header: "Prof Last Name",
            accessor: "lastName",
         },
         {
             Header: "Semester",
             accessor: "semesterYearID"
         },
         {
             Header: "Day",
             accessor: "day"
         },
         {
             Header: "Period",
             accessor: "period"
         },
         {
             Header: "Grade",
             accessor: "grade"
         },
         {
             Header: "Enroll Date",
             accessor: "enrollDate"
         }



    ], [])

    var initialState = ""
    if(title !== "Drop Classes"){
      initialState = {hiddenColumns: ['Actions']}
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: schedule, initialState})

    
    return(
        <div  className="table-center">
        {(semesterPicker !== false) ? <ChoseSemester semesterSelect={semesterSelect} onClick={choseSemester}/>
        : ""}
        <h1 className="text-align">{title ? title: "My Schedule"}</h1>   
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
