import dbUtil from '../utilities/dbUtil';
import {useTable} from 'react-table';
import React from 'react';
import Table from 'react-bootstrap/Table'
import { useState, useEffect} from 'react';
import checkPrivs from '../utilities/checkPrivs';
import { useHistory } from "react-router";


export default function GradCatalog(){

    const [gradCourses, setGradCourse] = useState([]);
    const privs = checkPrivs();
    let history = useHistory();


    useEffect(() =>{
        getGradCatalog();
    }, [])

   async function getGradCatalog(){
        const res = await dbUtil.getGradCourses()
        console.log(res)
            if(res.err){
              window.alert(res.err.sqlMessage)
              return("")
            }
            setGradCourse(res)
    }
    function editCourse(row){
      history.push({
        pathname: '/EditCourse',
        state: row
      })
    }

    function addCourse(){
      history.push({
          pathname: '/AddCourse'
       })
   }


    function deleteCourse(row){
      dbUtil.deleteCourse(row).then(data =>{
        if(data.err){
           window.alert(data.err.sqlMessage)
       }else{
        window.location.reload(false);
       }
     })
    }


    
    const columns = React.useMemo( () => [
        {
            accessor: 'Actions',
            width: 100,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => editCourse(cell.row.original)}>✏️</button>
              <div className='bigDivider'/>
              <button onClick={() => {
               if (window.confirm('Are you sure you wish to delete this item?')) 
               {
                  deleteCourse(cell.row.original)
               }}
                }>❌</button>
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
