import Card from 'react-bootstrap/Card'
import { useEffect } from 'react';
import dbUtil from '../utilities/dbUtil';

export default function StatData(){

    var studentEnrollment =[];
    var underGradStudent=[];
    var gradStudents=[];
    var avgGrade=[];
    var courses=[];

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
             studentEnrollment = studentEnrollment.map((x) => {
                 return(
                    <Card.Body>There are {numEnrolled} Students Enrolled at Suny Hogwarts</Card.Body>
                 )
             })
         }
         console.log(studentEnrollment)

        }
        async function generateunderGradStudent(){

       }
       async function generategradStudents(){

       }
       async function generateavgGrade(){

       }
       async   function generatecourses(){

       }





    return(
    <div>
        
        <Card className='align-center '>
            <Card.Header>Student Enrollment</Card.Header>
            {studentEnrollment}
            <Card.Text></Card.Text>
        </Card>
        <Card className='align-center '>
            <Card.Header>Undergrad Students</Card.Header>
            <Card.Body></Card.Body>
            <Card.Text></Card.Text>
        </Card>
        <Card className='align-center '>
            <Card.Header>Gradate Student</Card.Header>
            <Card.Body></Card.Body>
            <Card.Text></Card.Text>
        </Card>
        <Card className='align-center '>
            <Card.Header>Average Grade</Card.Header>
            <Card.Body></Card.Body>
            <Card.Text></Card.Text>
        </Card>
        <Card className='align-center '>
            <Card.Header>Courses Offered</Card.Header>
            <Card.Body></Card.Body>
            <Card.Text></Card.Text>
        </Card>

    </div>
    );
}
