import { useEffect } from "react";
import dbUtil from "./dbUtil";
import funcs from "./timeWindowFunc";

export default async function timeWindow(date, func, semester, alertDisabled){

    const springCalendar = await dbUtil.getSpringCal();
    const fallCalendar = await dbUtil.getFallCal();
    var response= ""

    if(semester.toLowerCase() === "fall"){
        var calDate = ""
        for(const i in fallCalendar){
            if(fallCalendar[i].Title === func){
                calDate = fallCalendar[i].Date.substring(0, 10);
            }
        }
        if(calDate === ""){
            window.alert("No timewindow event for that title")
        }

        const firstDayIndex = fallCalendar.map(e => e.Title).indexOf(funcs.firstDay)
        const firstDay = fallCalendar[firstDayIndex].Date.substring(0,10)


        const semesterEndIndex = fallCalendar.map(e => e.Title).indexOf(funcs.fallSemEnd)
        const semesterEnd = fallCalendar[semesterEndIndex].Date.substring(0,10)



        switch(func){
            case funcs.addDrop: {
                if(date > calDate){response = false}else if(date < calDate){response = true} break;
            }
            case funcs.springRegSen: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.springRegJun: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.springRegSop: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.springRegFirst: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.finalExams: {
                if(date > semesterEnd || date <= firstDay){response = false}else if(date < semesterEnd && date >= firstDay){response = true}break;
            }
            case funcs.fallSemEnd: {
                if(date > semesterEnd){response = false}else if(date < semesterEnd){response = true}break;
            }
            default :{
                console.log("An error has occured in time window")
                response = false
            }

        }
    }

    if(semester.toLowerCase() === "spring"){
        var calDate = ""
        for(const i in springCalendar){
            if(springCalendar[i].Title === func){
                calDate = springCalendar[i].Date.substring(0, 10);
            }
        }
        if(calDate === ""){
            window.alert("No timewindow event for that title")
        }

        const firstDayIndex = springCalendar.map(e => e.Title).indexOf(funcs.firstDay)
        const firstDay = springCalendar[firstDayIndex].Date.substring(0,10)

        const semesterEndIndex = springCalendar.map(e => e.Title).indexOf(funcs.springSemEnd)
        const semesterEnd = springCalendar[semesterEndIndex].Date.substring(0,10)

        console.log(date, 'userDate')
        console.log(calDate, 'calDate')
        console.log(date < calDate)
        switch(func){
            case funcs.addDrop: {
                if(date > calDate){response = false}else if(date < calDate){response = true} break;
            }
            case funcs.fallRegSen: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.fallRegJun: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.fallRegSop: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.fallRegFirst: {
                if(date < calDate){response = false}else if(date >= calDate){response = true} break;
            }
            case funcs.finalExams: {
                if(date > semesterEnd || date <= firstDay){response = false}else if(date < semesterEnd && date >= firstDay){response = true}break;
            }
            case funcs.springSemEnd: {
                if(date > semesterEnd){response = false}else if(date < semesterEnd){response = true}break;
            }
            default :{
                console.log("An error has occured in time window")
                response = false
            }

        }
        
    }

    if(response === false && !alertDisabled){
        window.alert("You are outside of the time window for this action")
    }
    return(response)
}