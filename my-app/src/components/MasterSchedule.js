import React, { useState, useEffect} from "react";
import { useTable, useFilters, useSortBy, useRowSelect } from "react-table";
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


     function editRow(row){
      console.log(row)
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

      
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
      } = useTable({ columns, data: schedule },
          useFilters, useSortBy, useRowSelect,
          (hooks) => {
            hooks.visibleColumns.push((columns) => {
               return [
                  {
                     id: 'edit',
                     Cell: ({row}) => (
                        <div>
                        <button className='editButton' onClick={() => editRow(row.original)}>✏️</button>
                        <div className='buttonDivider'/>
                        <button onClick={() => console.log(row.original)}>❌</button>
                        </div>
                     ) 
                  },
                  ...columns
               ]
            })
          })


     return (
      <div >
      <Table size="sm" striped bordered hover {...getTableProps()}>
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
