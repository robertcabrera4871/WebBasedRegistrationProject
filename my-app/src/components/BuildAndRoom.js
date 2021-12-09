import dbUtil from '../utilities/dbUtil';
import React from 'react';
import { useState, useEffect} from 'react';
import RoomTable from './tableComponents/RoomTable';
import BuildingsTable from './tableComponents/BuildingsTable';

export default function BuildAndRoom(){

    const[rooms, setRooms] = useState([]);
    const[buildings, setBuildings] = useState([]);

    useEffect(() => {
        getRooms();
        getBuildings();
    }, []);


    async function getRooms(){
        const response = await dbUtil.getRooms();
        setRooms(response)
      
    }
    async function getBuildings(){
        const response = await dbUtil.getBuildings();
        setBuildings(response)
    }

    return(
    <div>
        <h1 className='text-align'>Rooms</h1>
        <RoomTable rooms={rooms}/>
        <div></div>
        <h1 className='text-align'>Buildings</h1>
        <BuildingsTable buildings={buildings}/>
        
    </div>)

}