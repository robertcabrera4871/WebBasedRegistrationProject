import dbUtil from "../utilities/dbUtil";
import { useEffect, useState} from "react";
import decryptUser from "../utilities/decryptUser";
import React from "react";
import {useTable} from 'react-table'
import Table from 'react-bootstrap/Table'
import checkPrivs from "../utilities/checkPrivs";

export default function ViewHolds(adminAccess){

    const [userHolds, setHolds] = useState([])
    let privs = checkPrivs();
    
    useEffect(() =>{
        getHolds();
    }, []
    );

    var user = decryptUser();

    function getHolds(){
        if(privs.isAdmin){user.userID = adminAccess.location.state}
        dbUtil.getHolds(user.userID).then(
            data =>{
              console.log(data)
                setHolds(data)
            }
        )
        }

    async function dropHold(row){
         const response = await dbUtil.dropHold(row.holdID, adminAccess.location.state)
         if(response.err){
           console.log(response)
           window.alert(response.err.sqlMessage)
         }
         else{
           window.location.reload(false);
         }
      }
    
    const columns = React.useMemo( () =>[
      {
        accessor: 'Actions',
        Cell: ({cell}) => (
          <div>
          <button onClick={() => {
           if (window.confirm('Are you sure you wish to remove hold')) 
           {
              dropHold(cell.row.original);
           }}
            }>❌</button>
          </div>
        )
      },
        {
            Header:"Date Of Hold",
            accessor:"dateOfHold"
        },
        {
            Header:"Hold Type",
            accessor:"holdType"
        },
        {
          Header:"Hold ID",
          accessor:"holdID"
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
      } = useTable({columns, data: userHolds})

    return(
        <div className='table-center'>
        <h1 className="text-align">My Holds</h1>   
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

