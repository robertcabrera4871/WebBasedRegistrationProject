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
   // apply the table props
   
   <Table size="sm" striped bordered hover {...getTableProps()}>
       {console.log(schedule)}
     <thead>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
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
