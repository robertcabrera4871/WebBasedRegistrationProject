import dbUtil from "../utilities/dbUtil";
import { useEffect, useState} from "react";
import decryptUser from "../utilities/decryptUser";
import React from "react";
import {useTable} from 'react-table'
import Table from 'react-bootstrap/Table'

export default function ViewHolds(){

    const [userHolds, setHolds] = useState([])
    
    useEffect(() =>{
        getHolds();
    }, []
    );

    var user = decryptUser();

    function getHolds(){
        dbUtil.getHolds(user.userID).then(
            data =>{
                console.log(data)
                setHolds(data)
            }
        )
        }
    
    const columns = React.useMemo( () =>[
        {
            Header:"Date Of Hold",
            accessor:"dateOfHold"
        },
        {
            Header:"Hold Type",
            accessor:"holdType"
        }
    ], [])


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

