import React from "react";
import MasterSchedule from "./MasterSchedule";
import globalDate from "../utilities/globalDate";



export default function Home(){
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd

        if(globalDate.getGlobalDate() === null){
            globalDate.setGlobalDate(today)
        }
    

       return(
        <div >
        <MasterSchedule/>
            </div>
        
        
        


        
    );
}
