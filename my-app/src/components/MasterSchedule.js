import React, { useState, useEffect} from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";
import dbUtil from '../utilities/dbUtil'
import Table from 'react-bootstrap/Table'
import ColumnFilter from "./tableComponents/ColumnFilter";
import { useHistory } from 'react-router';
import checkPrivs from '../utilities/checkPrivs'
import ChoseSemester from "./subComponents/ChoseSemester";



export default function MasterSchedule({isAddClass}){

   //Needs more sorting options

    const [schedule, setSchedule] = useState([]);
    const [semesterSelect, setSemester]= useState("Spring 2021")
    let history = useHistory();
    const privs = checkPrivs();

     useEffect(() =>{
         getSchedule();
     }, [semesterSelect]
     );

     
     function choseSemester (semesterChosen) {
         setSemester(semesterChosen) 
         getSchedule()
     }

     function addClass(row){
        console.log(row)
     }
 
 
     function getSchedule(){
        dbUtil.getMasterSchedule().then(
           //CHANGE!!I
            data =>{
                if(semesterSelect === "Spring 2021"){
                  data = data.filter(item => (item.semesterYearID === "spring21"))
               }
               //ADD BACK IN LATER
               // else if(semesterSelect === "Fall 2022"){
               //    data = data.filter(item => (item.Semester === "Fall" && item.Year === "2021"))
               // }
               setSchedule(data)
            }
        )
     } 

     function newRow(){
        history.push('/addMS')
     }
     function editRow(rowData){
      history.push({
         pathname: '/editMS', 
         state: rowData
      })
   }
   

     function deleteRow(row){
         dbUtil.deleteMS(row).then(data =>{
            if(data.err){
               window.alert(data.err.sqlMessage)
           }else{
            window.location.reload(false);
           }
         })
     }
      
     
      const columns = React.useMemo( () => [
        {
            Header: "CRN",
            accessor: "CRN",
            Filter: ColumnFilter
         },

         {
            Header: "Course Section",
            accessor: "sectionNum",
            Filter: ColumnFilter
         },
         {
            Header: "CourseID",
            accessor: "courseID",
            Filter: ColumnFilter
         },
         {
            Header: "Department",
            accessor: "departmentID",
            Filter: ColumnFilter
         },
         {
            Header: "Day",
            accessor: "day",
            Filter: ColumnFilter
         },
         {
            Header: "Start Time",
            accessor: "startTime",
            Filter: ColumnFilter
         },
         {
            Header: "End Time",
            accessor: "endTime",
            Filter: ColumnFilter
         },

         {
            Header: "Semester",
            accessor: "semesterYearID",
            Filter: ColumnFilter
         },
         {
            Header: "Room No.",
            accessor: "roomID",
            Filter: ColumnFilter
         },
         {
            Header: "Prof Last Name",
            accessor: "lastName",
            Filter: ColumnFilter
         },
         {
            Header: "Prof First Name",
            accessor: "firstName",
            Filter: ColumnFilter
         },
         {
            Header: "Seats",
            accessor: "availableSeats",
            Filter: ColumnFilter
         },
         {
            Header: "Capacity",
            accessor: "capacity",
            Filter: ColumnFilter
         }

    ], []);

     
      
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
      } = useTable({ columns, data: schedule },
          useFilters, useSortBy, usePagination,
          (hooks) => {
            if(privs.isAdmin){
            hooks.visibleColumns.push((columns) => {
               return [
                  {
                     id: 'edit',
                     Cell: ({row}) => (
                        <div>
                        <button className='editButton' onClick={() => editRow(row.original)}>✏️</button>
                        <div className='buttonDivider'/>
                        <button className='delete-button' onClick={(e) => { 
                           if (window.confirm('Are you sure you wish to delete this item?')) 
                           {
                              deleteRow(row.original)
                           } }}>❌</button>
                        </div>
                     ) 
                  }, 
                  ...columns
                  ]
            })}
            else if(isAddClass){
               hooks.visibleColumns.push((columns) =>{
                  return[
                      { 
                        id: "addClass",
                        Cell: ({cell}) => (
                           <div>
                              <button title="Add to Schedule" onClick={() =>addClass(cell.row.original)}>➕</button>
                           </div>
                        )
                     },
                     ...columns
                  ]
               })
            }
          })
 

         const {pageIndex} = state


     return (
      <div >
      <ChoseSemester onClick={choseSemester} semesterSelect={semesterSelect} />
      <h1 className='text-align'>Master Schedule</h1>

      <b>Hover column to search, Click column to sort</b>
         { privs.isAdmin && <div><button onClick={(e) => newRow()}>➕ Add to Master Schedule </button></div>}
      
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
    </div>
 )
}
