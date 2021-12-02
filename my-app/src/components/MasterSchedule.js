import React, { useState, useEffect} from "react";
import { useTable, useFilters } from "react-table";
import dbUtil from '../utilities/dbUtil'
import Table from 'react-bootstrap/Table'
import ColumnFilter from "./tableComponents/ColumnFilter";

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
            accessor: "CRN",
            Filter: ColumnFilter
         },

         {
            Header: "Course Section",
            accessor: "CourseSection",
            Filter: ColumnFilter
         },
         {
            Header: "CourseID",
            accessor: "CourseID",
            Filter: ColumnFilter
         },
         {
            Header: "Department",
            accessor: "Department",
            Filter: ColumnFilter
         },
         {
            Header: "Day",
            accessor: "Day",
            Filter: ColumnFilter
         },
         {
            Header: "Start Time",
            accessor: "StartTime",
            Filter: ColumnFilter
         },
         {
            Header: "End Time",
            accessor: "EndTime",
            Filter: ColumnFilter
         },

         {
            Header: "Semester",
            accessor: "Semester",
            Filter: ColumnFilter
         },
         {
            Header: "Year",
            accessor: "Year",
            Filter: ColumnFilter
         },
         {
            Header: "Room No.",
            accessor: "RoomNumber",
            Filter: ColumnFilter
         },
         {
            Header: "Prof Last Name",
            accessor: "ProfLastName",
            Filter: ColumnFilter
         },
         {
            Header: "Prof First Name",
            accessor: "ProfFirstName",
            Filter: ColumnFilter
         },
         {
            Header: "Seats",
            accessor: "Seats",
            Filter: ColumnFilter
         },
         {
            Header: "Capacity",
            accessor: "Capacity",
            Filter: ColumnFilter
         }

    ], []);

      const tableInstance = useTable({ columns, data: schedule }, useFilters)
      
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance

     return (
      <div >
      <Table size="sm" striped bordered hover {...getTableProps()}>
      <thead>
        { headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th className='column'{...column.getHeaderProps()}>
                { column.render('Header')}
                <div className='filter'>{column.canFilter? column.render('Filter') : null }</div>
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
 )
}
