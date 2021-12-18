import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react';
import dbUtil from '../utilities/dbUtil';
import { Chart, Doughnut } from 'react-chartjs-2';


export default function StatData(){

    const [studentEnrollment, setStudentEnrollment] = useState("")
    const [underGradStudent, setUndergradStudent] = useState("")
    const [gradStudents, setGradStudent]= useState("");
    const [courses, setCourses] = useState("")
    const [chart, setChart] = useState([])

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
                    setUndergradStudent(`The number of Graduate student enrolled at SUNY Hogwarts is ${numEnrolled}`)
                }   
       }
       async function generategradStudents(){
        const res = await dbUtil.getGradStudents()
        const numEnrolled = (res[0][`COUNT(DISTINCT studentID)`])
            if(res.err){
                window.alert(res.err.sqlMessage)
            }else{
                setGradStudent(`The number of Undergraduate students enrolled at SUNY Hogwarts is ${numEnrolled}`)
            }   
       }


       async function generateavgGrade(){
        const res = await dbUtil.getGrades()
            if(res.err){
                window.alert(res.err.sqlMessage)
            }
        console.log(res)  

        // let doughnut = {
        //     labels = ['A', 'B', 'C', 'D', 'F', 'IP'],
        //     dataSets: [

        //     ]
        // }


       }
       async function generatecourses(){

       }





    return(
    <div>
        
        <Card border="success" className='align-center topSpace'>
            <Card.Header>Student Enrollment</Card.Header>
            <Card.Body>{studentEnrollment}</Card.Body>
            <Card.Text></Card.Text>
        </Card>
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
            <Card.Body></Card.Body>
            <Card.Text></Card.Text>
        </Card>

    </div>
    );
}
