import React, { useState, useEffect} from "react";
import { useTable } from "react-table";
import dbUtil from '../utilities/dbUtil'
import Table from 'react-bootstrap/Table'

export default function MasterSchedule(){

    const [schedule, setSchedule] = useState([]);

     useEffect(() =>{
         getSchedule();
     }, []
     );

     function getSchedule(){
        dbUtil.getMasterSchedule().then(
            data =>{
                setSchedule(data)
            }
        )
     } 

      

      const columns = React.useMemo( () => [
        {
            Header: "CRN",
            accessor: "CRN"
         },

         {
            Header: "Course Section",
            accessor: "CourseSection"
         },
         {
            Header: "CourseID",
            accessor: "CourseID"
         },
         {
            Header: "Department",
            accessor: "Department"
         },
         {
            Header: "Day",
            accessor: "Day"
         },
         {
            Header: "Start Time",
            accessor: "StartTime"
         },
         {
            Header: "End Time",
            accessor: "EndTime"
         },

         {
            Header: "Semester",
            accessor: "Semester"
         },
         {
            Header: "Year",
            accessor: "Year"
         },
         {
            Header: "Room No.",
            accessor: "RoomNumber"
         },
         {
            Header: "Prof Last Name",
            accessor: "ProfLastName"
         },
         {
            Header: "Prof First Name",
            accessor: "ProfFirstName"
         },
         {
            Header: "Seats",
            accessor: "Seats"
         },
         {
            Header: "Capacity",
            accessor: "Capacity"
         }

    ], []);

      const tableInstance = useTable({ columns, data: schedule })
      
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance

     return (
      
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
 )
}
