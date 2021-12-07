
const express = require('express')
const mysql = require('mysql')
const app = express();
const port = 8000;
const cors = require("cors");
const e = require('express');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "test",
});



function getDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd
    return today
    }

app.post('/login', (req, res) =>{
    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "SELECT * FROM logininfo WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if(err){
                res.send({err: err})
            } 
            if(result.length > 0) {
                res.send(result)
             } 
             else{
                res.send({message: "Wrong combination"});
                }
            }
    );
});

app.put('/editMS', (req, res) =>{
    const params = req.body.params
    db.query(
        "UPDATE MasterSchedule SET CRN = ? , CourseSection = ?,"+
         "CourseID = ?, Department = ?, Day = ?, StartTime = ?,"+
         "EndTime = ?, Semester = ?, Year = ?,RoomNumber= ?, ProfLastName= ?,"+
         "ProfFirstName= ?, Seats= ?, Capacity=? WHERE CRN=? " ,
        [params.CRN, params.CourseSection, params.CourseID, params.Department,
        params.Day, params.StartTime, params.EndTime, params.Semester, params.Year, params.RoomNumber,
        params.ProfLastName,params.ProfFirstName, params.Seats, params.Capacity, params.OldCRN],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
 })

 app.put('/deleteMS', (req, res) =>{
     const CRN = req.body.params.CRN
     db.query(
         "DELETE FROM MasterSchedule WHERE CRN = ? ", 
         [CRN],
         (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
     )
 })

 app.put('/addMS' , (req, res) =>{
     const params = req.body.params
     db.query(
        "INSERT INTO MasterSchedule Values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [params.CRN, params.CourseSection, params.CourseID, params.Department,
        params.Day, params.StartTime, params.EndTime, params.Semester, params.Year, params.RoomNumber,
        params.ProfLastName,params.ProfFirstName, params.Seats, params.Capacity],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
     )
 })

app.get('/emailExist', (req, res) =>{
    const email = req.query.email;
    db.query(
        "SELECT EXISTS (SELECT 1 FROM LoginInfo WHERE email = ?)",
        [email],
        (err, result) =>{
            if(err){
                res.send({err: err})
            } 
            else{
                res.send(result)
             } 
        }
    )
})

app.put('/resetPassword', (req, res) =>{
    const email = req.body.params.email;
    const tempPassword = Math.random().toString(16).substr(2, 8);

    db.query(
        `UPDATE logininfo SET password = "${tempPassword}" , status = "locked" WHERE email = ?`,
        [email],
        (err, result) =>{
            if(err){
                res.send({err: err})
            } 
            else{
                res.send(result)
             } 
        }
    )
})


app.get('/masterSchedule', (req, res) =>{
    db.query(
        'SELECT * FROM MasterSchedule',
        [],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})

app.get('/allUsers', (req, res) =>{
    db.query(
        'SELECT * FROM User',
        [],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})

app.get('/majors',  (req, res) =>{
    db.query(
        'SELECT * FROM Major',
        [],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.get('/majorRequirements',  (req, res) =>{
    db.query(
        'SELECT * FROM MajorRequirements',
        [],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.get('/minors' , (req, res) =>{
    db.query(
        'SELECT * FROM Minor',
        [],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.get('/minorRequirements',  (req, res) =>{
    db.query(
        'SELECT * FROM MinorRequirements',
        [],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.put('/updateAndUnlock', (req, res) =>{
    const email = req.body.params.email;
    const newPass = req.body.params.newPass;

    db.query(
        `UPDATE logininfo SET password = "${newPass}", status="active" WHERE email = ?`,
        [email, newPass],
        (err, result) =>{
            if(err){
                res.send({err: err})
            } 
            else{
                res.send(result)
             } 
        }
    )
})

app.post('/myAdvisors', (req, res) =>{
    const studentID = req.body.params.userID;
    db.query(
        `SELECT f.FirstName, f.lastName, a.dateOfAppointment FROM FacultyAdvising a JOIN User f ON studentID= ? WHERE a.facultyID = f.userID`,
    [studentID],
    (err, result) =>{
        if(err){
            res.send({err:err})
        }
        else{
            res.send(result)
        }
    }
    )
})

app.post('/getUserSched', (req, res) =>{
    const userID = req.body.params.userID;

    db.query(
        `SELECT  c.CourseID, c.CRN, c.roomID, u2.firstName, u2.lastName, c.semesterYearID, t.day, t.period, e.grade, e.enrollDate
        FROM Enrollment e
        JOIN User u
        ON studentID= ? AND u.userID = ?
        JOIN CourseSection c
        ON e.CRN = c.CRN
        JOIN Timeslot t
        ON c.timeSlotID = t.timeSlotID
        JOIN User u2 
        ON c.facultyID = u2.userID;
        `, [userID, userID],
    (err, result) =>{
        if(err){
            res.send({err: err})
        }else{
            res.send(result)
        }
    }
    )
})

app.get('/getGradCourses', (req,res) =>{

    db.query(
        `SELECT cs.courseID, c.departmentID, c.numOfCredits
        FROM CourseSection cs
        JOIN Course c
        ON cs.courseID = c.courseID
        WHERE cs.CRN LIKE  '%3';`,
     [],
    (err, result) =>{
        if(err){
            res.send({err: err})
        } else{
            res.send(result)
        }
    }
    )
})


app.get('/courses',  (req, res) =>{
    db.query(
        'SELECT * FROM Course',
        [],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.post('/myMajors',  (req, res) =>{
    const studentID = req.body.params.userID;
    db.query(
        'SELECT * FROM StudentMajor WHERE studentID = ? ',
        [studentID],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.put('/dropMyMajor', (req, res) =>{
    const majorID = req.body.params.majorID;
    const userID = req.body.params.userID;
    db.query(
        `DELETE FROM StudentMajor
        WHERE studentID = ? AND majorID = ?`,
        [userID, majorID],
        (err, result) => {
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.put('/dropMyMinor', (req, res) =>{
    const minorID = req.body.params.minorID;
    const userID = req.body.params.userID;
    db.query(
        `DELETE FROM StudentMinor
        WHERE studentID = ? AND minorID = ?`,
        [userID, minorID],
        (err, result) => {
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})

app.put('/declareMyMajor', (req, res) => {
    const major = req.body.params.majorID;
    const userID = req.body.params.userID;
    const currentDate = getDate();

    db.query(
        `INSERT INTO StudentMajor VALUES (? ,  ? ,  ?)`,
        [major, userID, currentDate],
        (err, result) => {
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.put('/declareMyMinor', (req, res) => {
    const minor = req.body.params.minorID;
    const userID = req.body.params.userID;
    const currentDate = getDate();

    db.query(
        `INSERT INTO StudentMinor VALUES (? ,  ? ,  ?)`,
        [minor, userID, currentDate],
        (err, result) => {
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})
app.post('/myMinors',  (req, res) =>{
    const studentID = req.body.params.userID;
    db.query(
        'SELECT * FROM StudentMinor WHERE studentID = ?',
        [studentID],
        (err, result) =>{
            if(err){
                res.send({err: err})
            }
            else{
                res.send(result)
            }
        }
    )
})

app.post('/getHolds', (req, res) =>{
    const studentID = req.body.params.userID;
    db.query(
        `SELECT DISTINCT s.dateOfHold, h.holdType
        FROM Hold h
        JOIN StudentHold s
        ON s.studentID = ?;
         `,
    [studentID],
    (err, result) => {
        if(err){
            res.send({err: err})
        }
        else{
            res.send(result)
        }
    }
    )
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});