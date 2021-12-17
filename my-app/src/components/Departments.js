import { useState, useEffect} from 'react';
import dbUtil from '../utilities/dbUtil';
import React from "react";
import DepartmentTable from './tableComponents/DepartmentTable';


export default function Deparmtent(){
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments();
    }, [])

    async function getDepartments(){
        const response = await dbUtil.getDepartments();
        setDepartments(response)
}
    
    


    return(<div>
        <h1 className='text-align'>Departments</h1>
        <DepartmentTable departments={departments}/>
    </div>)
}