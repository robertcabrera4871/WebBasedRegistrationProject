import React, { useState, useEffect} from "react";
import dbUtil from "../../utilities/dbUtil";
import { useTable, useSortBy  } from "react-table";
import Table from 'react-bootstrap/Table'
import formatDate from "../../utilities/formateDate";
import checkPrivs from "../../utilities/checkPrivs";
import { useHistory } from "react-router-dom";

export default function CalendarTable(semesterSelect){

    const [calendar, setCalendar] = useState([])
    let privs = checkPrivs()
    let history = useHistory()

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

    async function editDescription(row){
        var semester = ''
    if(semesterSelect.semesterSelect === 'Fall 2021'){
            semester = 'Fall'
        } else{
            semester = 'Spring'
        }
        const desc = window.prompt('Enter new description')
        const res = await dbUtil.editCalDesc(row.Title, desc, semester)
        if(res.err){
            window.alert("Operation failed")
        }
        console.log(res)
    }

    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 10,
            Cell: ({cell}) => (
                
              <div>
             { privs.isAdmin &&  <button onClick={() => editDescription(cell.row.original)}>✏️</button>}
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
    ], [])

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