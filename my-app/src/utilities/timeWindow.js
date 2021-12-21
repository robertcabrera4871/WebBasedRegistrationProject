import { useEffect } from "react";
import dbUtil from "./dbUtil";
import funcs from "./timeWindowFunc";
import globalDate from "./globalDate";
import checkPrivs from "./checkPrivs";

export default async function timeWindow(func, alertDisabled){

    const springCalendar = await dbUtil.getSpringCal();
    const fallCalendar = await dbUtil.getFallCal();


    const date = globalDate.getGlobalDate()
    var semester = ""
    var response = false;
    let privs = checkPrivs()

    const FfirstDayIndex = fallCalendar.map(e => e.Title).indexOf(funcs.firstDay)
    const FfirstDay = fallCalendar[FfirstDayIndex].Date.substring(0,10)
    const FsemesterEndIndex = fallCalendar.map(e => e.Title).indexOf(funcs.fallSemEnd)
    const FsemesterEnd = fallCalendar[FsemesterEndIndex].Date.substring(0,10)

     const FfinalExamsInd = fallCalendar.map(e => e.Title).indexOf(funcs.finalExams)


     const FfinalExams = fallCalendar[FfinalExamsInd].Date.substring(0,10)


     const SfinalExamsInd = springCalendar.map(e => e.Title).indexOf(funcs.finalExams)
     const SfinalExams = springCalendar[SfinalExamsInd].Date.substring(0,10)

    const SfirstDayIndex = springCalendar.map(e => e.Title).indexOf(funcs.firstDay)
    const SfirstDay = springCalendar[SfirstDayIndex].Date.substring(0,10)
    const SsemesterEndIndex = springCalendar.map(e => e.Title).indexOf(funcs.springSemEnd)
    const SsemesterEnd = springCalendar[SsemesterEndIndex].Date.substring(0,10)

    if(FfirstDay <= date && date <= FsemesterEnd ){
        semester = 'fall'
    }else if(SfirstDay <= date && date <= SsemesterEnd){
        semester = 'spring'
    }else if(!privs.isAdmin){
        window.alert("You are not within the semester")
        return(false)
    }
    
    if(semester === "fall"){
        var calDate = ""
        for(const i in fallCalendar){
            if(fallCalendar[i].Title === func){
                calDate = fallCalendar[i].Date.substring(0, 10);
            }
        }
        if(calDate === ""){
            window.alert("No timewindow event for that title")
        }

        console.log(funcs.springRegSen)


        const FRegStartInd = fallCalendar.map(e => e.Title).indexOf(funcs.springRegSen)
        const FRegStart = fallCalendar[FRegStartInd].Date.substring(0,10)


        console.log(date)
        console.log(calDate)
        console.log(FfinalExams)
        switch(func){
            case funcs.addDrop: {
                console.log()
                if(date > calDate && date < FRegStart){response = false; window.alert("addDrop error")}else if(date < calDate || date > FRegStart){response = true} break;
            }
            case funcs.springRegSen: {
                if(date < calDate){response = false ; window.alert("spring reg senior error")}else if(date >= calDate){response = true} break;
            }
            case funcs.springRegJun: {
                if(date < calDate){response = false; window.alert("spring reg jun error")}else if(date >= calDate){response = true} break;
            }
            case funcs.springRegSop: {
                if(date < calDate){response = false; window.alert("spring reg sop error")}else if(date >= calDate){response = true} break;
            }
            case funcs.springRegFirst: {
                if(date < calDate){response = false ; window.alert("spring reg fresh error")}else if(date >= calDate){response = true} break;
            }
            case funcs.finalExams: {
                if(date > FsemesterEnd || date < FfinalExams){response = false; window.alert("finals error")}else if(date <= FsemesterEnd && date >= FfinalExams){response = true}break;
            }
            case funcs.fallSemEnd: {
                if(date > FsemesterEnd){response = false; window.alert("fall semester end error")}else if(date < FsemesterEnd){response = true}break;
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

        
        const SRegStartInd = springCalendar.map(e => e.Title).indexOf(funcs.fallRegSen)
        const SRegStart = springCalendar[SRegStartInd].Date.substring(0,10)

       


        switch(func){
            case funcs.addDrop: {
                if(date > calDate && date < SRegStart){response = false; window.alert("addDrop error")}else if(date < calDate){response = true} break;
            }
            case funcs.fallRegSen: {
                if(date < calDate){response = false; window.alert("fallRegSen error")}else if(date >= calDate){response = true} break;
            }
            case funcs.fallRegJun: {
                if(date < calDate){response = false; window.alert("fallRegJun error")}else if(date >= calDate){response = true} break;
            }
            case funcs.fallRegSop: {
                if(date < calDate){response = false; window.alert("fallRegSop error")}else if(date >= calDate){response = true} break;
            }
            case funcs.fallRegFirst: {
                if(date < calDate){response = false; window.alert("fallRegFirst error")}else if(date >= calDate){response = true} break;
            }
            case funcs.finalExams: {
                if(date > SsemesterEnd || date < SfinalExams){response = false; window.alert("finalExams error")}else if(date <= SsemesterEnd && date >= SfinalExams){response = true}break;
            }
            case funcs.springSemEnd: {
                if(date > SsemesterEnd){response = false; window.alert("springSemEnd error")}else if(date < SsemesterEnd){response = true}break;
            }
            default :{
                console.log("An error has occured in time window")
                response = false
            }

        }
        
    }

    return(response)
}