import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react';
import dbUtil from '../utilities/dbUtil';
import { Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';




export default function StatData(){

    const [studentEnrollment, setStudentEnrollment] = useState("")
    const [underGradStudent, setUndergradStudent] = useState("")
    const [gradStudents, setGradStudent]= useState("");
    const [courses, setCourses] = useState("")

    const [chart, setChart] = useState([])
    ChartJS.register(ArcElement, Tooltip, Legend);


    let gradeCount = {
        aCount: 0,
        bCount: 0,
        cCount: 0,
        dCount: 0,
        fCount: 0,
        ipCount: 0
    }

    useEffect(() => {
        generatestudentEnrollment();
        generateunderGradStudent()
        generategradStudents()
        generateavgGrade()
        generatecourses()
    },[])

        async function generatestudentEnrollment(){
        const res = await dbUtil.getStudentsEnrolled()
        const numEnrolled = (res[0][`COUNT(DISTINCT studentID)`])
            if(res.err){
                window.alert(res.err.sqlMessage)
            }else{
                setStudentEnrollment(`The number of student enrolled at SUNY Hogwarts is ${numEnrolled}`)
            }   
        }

        async function generateunderGradStudent(){
            const res = await dbUtil.getUndergradStudents()
            const numEnrolled = (res[0][`COUNT(DISTINCT studentID)`])
                if(res.err){
                    window.alert(res.err.sqlMessage)
                }else{
                    setUndergradStudent(`The number of Undergraduate student enrolled at SUNY Hogwarts is ${numEnrolled}`)
                }   
       }
       async function generategradStudents(){
        const res = await dbUtil.getGradStudents()
        const numEnrolled = (res[0][`COUNT(DISTINCT studentID)`])
            if(res.err){
                window.alert(res.err.sqlMessage)
            }else{
                setGradStudent(`The number of Graduate students enrolled at SUNY Hogwarts is ${numEnrolled}`)
            }   
       }

       async function generatecourses(){
        const res = await dbUtil.getCourseAmount()
        const numCourses = (res[0][`COUNT(DISTINCT courseID)`])
            if(res.err){
                window.alert(res.err.sqlMessage)
            }else{
                setCourses(`The number of courses offered at SUNY Hogwarts is ${numCourses}`)
            }   
       }



       async function generateavgGrade(){
        const res = await dbUtil.getGrades()
            if(res.err){
                window.alert(res.err.sqlMessage)
            }
            for(const grade in res){
                switch(res[grade].grade){
                    case 'A': gradeCount.aCount++; break; 
                    case 'B': gradeCount.bCount++; break; 
                    case 'C': gradeCount.cCount++; break; 
                    case 'D': gradeCount.dCount++; break; 
                    case 'F': gradeCount.gCount++; break; 
                    case 'IP': gradeCount.ipCount++; break; 
                }
            }
        let data = {
            labels: ['A', 'B', 'C', 'D', 'F', 'IP'],
            datasets: [
            {
            data:[gradeCount.aCount, gradeCount.bCount, gradeCount.cCount, gradeCount.dCount, gradeCount.fCount, gradeCount.ipCount],
            backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(153, 102, 255, 0.2)',
              ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(153, 102, 255, 1)',

              ],
              borderWidth: 1,
            },
          ],
        }

        setChart(data)


       }
      




    return(
    <div>
        
        <h1 className='text-align'>Statistics</h1>
       <Card border="success" className='align-center topSpace'>
            <Card.Header>Student Enrollment</Card.Header>
            <Card.Body>{studentEnrollment}</Card.Body>
            <Card.Text></Card.Text>
        </Card>

        <h1 className='text-align'>Grade Distribution</h1>
        <div className='pie-center'>
        {chart.length !== 0 ?
        <Doughnut data={chart}/>: ""}</div>

        <Card border="success"className='align-center topSpace'>
            <Card.Header>Undergrad Students</Card.Header>
            <Card.Body >{underGradStudent}</Card.Body>
            <Card.Text></Card.Text>
        </Card>
        

        <Card border="success" className='align-center topSpace'>
            <Card.Header>Gradate Student</Card.Header>
            <Card.Body>{gradStudents}</Card.Body>
            <Card.Text></Card.Text>
        </Card>
        <Card border="success" className='align-center topSpace'>
            <Card.Header>Courses Offered</Card.Header>
            <Card.Body>{courses}</Card.Body>
            <Card.Text></Card.Text>
        </Card>

     

    </div>
    );
}
