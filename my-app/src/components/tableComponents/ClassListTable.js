import { useState, useEffect} from 'react';
import {useTable} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import dbUtil from '../../utilities/dbUtil';
import AttendenceTable from './AttendenceTable';
import checkPrivs from "../../utilities/checkPrivs";
import decryptUser from "../../utilities/decryptUser";

    export default function ClassListTable(row){
    const[classList, setClassList] = useState([]);
    var user = decryptUser();
    let privs = checkPrivs();


    useEffect(() =>{
        getClassList();
    }, [])


    // if(privs.isAdmin){user.userID = adminAccess.location.state}


    async function getClassList(){
        const response = await dbUtil.getClassList(row.location.state.CRN);
        setClassList(response)
    }


    const columns = React.useMemo(() => [
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