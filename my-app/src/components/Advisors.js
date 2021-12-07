import { useEffect, useState } from "react";
import dbUtil from "../utilities/dbUtil";
import {AES, enc} from 'crypto-js'
import React from "react";
import { useTable } from "react-table";
import Table  from "react-bootstrap/Table";

export default function Advisors(){

    const[myAdvisors, setMyAdvisors] = useState([]);
    

    useEffect(() => {
        getAdvisors();
    }, [])


    var user = ""
     if(sessionStorage.getItem('user')){
    const decrypted = AES.decrypt(sessionStorage.getItem('user'), 'secret-key1')
     user = decrypted.toString(enc.Utf8);
     user = JSON.parse(user)
    }


    function getAdvisors(){
        dbUtil.getMyAdvisors(user.userID).then(
            data =>{
                setMyAdvisors(data)
            }
        )
    }

    const columns = React.useMemo(() =>[
        {
            Header: "First Name",
            accessor: "FirstName"
        },
        {
            Header: "Last Name",
            accessor: "lastName"
        },
        {
            Header: "Date Assigned",
            accessor: "dateOfAppointment"
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = useTable({columns, data: myAdvisors})

        console.log(myAdvisors)
        return(
            <div className="table-center">
              <h1 className="text-align">Advisors</h1>
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
        )}