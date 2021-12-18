import React, { useState, useEffect} from "react";
import { useTable } from "react-table";
import dbUtil from "../utilities/dbUtil";
import decryptUser from "../utilities/decryptUser";
import Table from "react-bootstrap/Table";
import { useHistory } from "react-router-dom";
import checkPrivs from "../utilities/checkPrivs";

export default function FacHistory(){
    const [facHistory, setFacHistory] = useState([]);

    let history = useHistory();
    let privs = checkPrivs();

    useEffect(() =>{
        getFacultyHistory();
    }, []);

    var user = decryptUser();


    if(history.location.state !== undefined){
        user.userID = history.location.state
    }

    async function getFacultyHistory(){
        const res = await dbUtil.getFacultyHistory(user.userID);
        if(!res.err){
            setFacHistory(res)
        }else if(res.err){
          window.alert(res.err.sqlMessage)
          console.log(res)

        }

    }

    function addHistory(){
        history.push({
            pathname: '/addFacHistory',
            state: user.userID
          })
    }

    async function deleteHistory(row){
        const res = await dbUtil.deleteFacHistory(row.CRN)
        if(!res.err){
            window.location.reload(false)
        } else if(res.err){
            window.alert(res.err.sqlMessage)
        }
        console.log(res)
    }

    const columns = React.useMemo(() => [
        {
            accessor: 'Actions',
            width: 10,
            Cell: ({cell}) => (
              <div>
                { privs.isAdmin &&
              <button onClick={() => {
               if (window.confirm('Are you sure you wish to delete this item?')) 
               {
                  deleteHistory(cell.row.original)
               }}
                }>❌</button>}
              </div>
            )
          },
        {
            Header: "CRN",
            accessor: "CRN"
        },
        {
            Header: "Faculty ID",
            accessor: "facultyID"
        },
        {
            Header: "Semester Year ID",
            accessor: "semesterYearID"
        }
    ], [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: facHistory})

    
    return(
        <div className="table-center">
        <h1 className="text-align">Teaching History</h1>   
        {privs.isAdmin && <button onClick={()=>{addHistory()}}>➕ Add History</button>}
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
    </div>
    
    );
}
