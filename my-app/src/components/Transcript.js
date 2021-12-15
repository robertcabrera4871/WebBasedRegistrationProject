import ChoseSemester from './subComponents/ChoseSemester'
import { useState, useEffect, } from 'react';
import dbUtil from '../utilities/dbUtil';
import {useTable} from 'react-table'
import React from 'react';
import Table from 'react-bootstrap/Table'
import decryptUser from '../utilities/decryptUser';
import MasterSchedule from './MasterSchedule';
import { useHistory } from 'react-router-dom';
import checkPrivs from '../utilities/checkPrivs';

export default function Transcript(adminAccess){

    const [transcript, setTranscript] = useState([]);
    let history = useHistory();
    let privs = checkPrivs();

    useEffect(() =>{
        getStudentHistory();
    }, []);
    var adminUser = adminAccess.adminAccess

    var user = decryptUser();

    if(adminUser !== undefined){
        user.userID = adminUser
    }

    async function getStudentHistory(){
        const res =  await dbUtil.getStudentHistory(user.userID)
        setTranscript(res)
    }

    async function addHistory(){
        history.push({
            pathname: '/AddTranscript', 
            state: user.userID
         })
    }

    async function editGrade(){
      
    }
    async function deleteTranscript(){
        
    }

    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 10,
            Cell: ({cell}) => (
              <div>
              <button onClick={() => editGrade(cell.row.original)}>✏️</button>
              <div className='bigDivider'/>
              <button onClick={() => {
               if (window.confirm('Are you sure you wish to delete this item?')) 
               {
                deleteTranscript(cell.row.original)
               }}
                }>❌</button>
              </div>
            )
          },
        {
          Header: "CRN",
          accessor: "CRN",
        },
        {
          Header: "SemesterYearID",
          accessor: "semesterYearID"
        },
        {
          Header: "Grade",
          accessor: "grade"
        }
    ], [])

    var initialState = ""
    if(!privs.isAdmin || history.location.pathname === "/degreeAudit"){
      initialState = {hiddenColumns: ['Actions']}
    }

      

    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: transcript, initialState})

    return(
    <div>
        <div className="table-center">
        <h1 className="text-align">Transcript</h1>   
        {adminUser !== undefined  && history.location.pathname != "/degreeAudit" &&<button onClick={() => {addHistory()}}>➕ Add to Transcript</button>}
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
    {adminUser !== undefined && history.location.pathname!="/degreeAudit" && <MasterSchedule adminAccess ={adminUser} isAddClassStudent={true}/>}
        </div>
    </div>
    );
}
