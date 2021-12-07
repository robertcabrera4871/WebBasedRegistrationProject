import dbUtil from '../utilities/dbUtil';
import {useTable} from 'react-table';
import React from 'react';
import Table from 'react-bootstrap/Table'
import { useState, useEffect} from 'react';
import checkPrivs from '../utilities/checkPrivs';

export default function GradCatalog(){

    const [gradCourses, setGradCourse] = useState([]);
    const privs = checkPrivs();

    useEffect(() =>{
        getGradCatalog();
    }, [])

    function getGradCatalog(){
        dbUtil.getGradCourses().then(data =>{
            setGradCourse(data)
        })
    }
    function clicked(){

    }


    
    const columns = React.useMemo( () => [
        {
            accessor: 'Actions',
            width: 100,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => clicked(cell.row.original)}>✏️</button>
              <div className='bigDivider'/>
              <button onClick={() => clicked(cell.row.original)}>❌</button>
              </div>
            )
          },
        {
            Header: 'Course Name',
            accessor: 'courseID'
        },
        {
            Header: 'Department',
            accessor: 'departmentID'
        },
        {
            Header: 'Credits',
            accessor: 'numOfCredits'
        }
    ], [])

    var initialState = ""
    if(!privs.isAdmin){
      initialState = {hiddenColumns: ['Actions']}
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: gradCourses, initialState})

    return(
    <div className="table-center"> 
     <h1 className="text-align"> Graduate Courses</h1>
     {privs.isAdmin && <button>➕ Add Course</button>}
         <Table size="sm" striped bordered hover {...getTableProps()}>
      <thead>
        { headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps({
                style: {width: column.width}
              })}>
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
