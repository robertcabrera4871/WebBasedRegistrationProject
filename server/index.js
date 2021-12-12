
const express = require('express')
const mysql = require('mysql')
const app = express();
const port = 8000;
const cors = require("cors");

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

app.post('/AddDepartment', (req,res) =>{
    const params = req.body.params
    db.query(
        `INSERT INTO Department VALUES(?,?,?,?,?,?)`,
        [params.departmentID, params.roomID, params.dEmail, params.dPhone, params.dChair,
            params.dManager],
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
app.put('/createFullUndergrad', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO UndergradFulltime VALUES(?,?,?)`,
        [params.studentID, params.minCourse, params.maxCredit],
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

app.put('/createPartUndergrad', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO UndergradPartTime VALUES(?,?,?)`,
        [params.studentID, params.minCredit, params.maxCourse],
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
app.put('/createFullPartFac', (req, res) => {
    const params = req.body.params;
    db.query(
        `INSERT INTO ${params.fullPart}timeFac VALUES(?, ?, ?)`,
        [params.facultyID, params.minCourse, params.maxCourse],
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
app.put('/createFaculty', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO Faculty VALUES(?,?)`,
        [params.userID, params.rank],
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

app.put('/createAdmin', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO Admin VALUES(?,?)`,
        [params.userID, params.status],
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
app.put('/createResearch', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO ResearchStaff VALUES(?,?)`,
        [params.userID, params.status],
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

app.put('/createPartUndergrad', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO UndergradPartTime VALUES(?,?,?)`,
        [params.studentID, params.minCredit, params.maxCredit],
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

app.put('/createPartGrad', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO GradPartTime VALUES(?,?,?)`,
        [params.studentID, params.minCredit, params.maxCredit],
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


app.put('/createStudent', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO Student VALUES(?,?,?,?,?)`,
        [params.studentID, params.creditsEarned, params.yearLevel, params.studentType, params.yearOfEntrance],
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

app.put('/createLogin', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO LoginInfo VALUES(?,?,?,?,?)`,
        [params.userID, params.email, params.password, params.userType, params.status],
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

app.put('/createUser', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO User VALUES(?,?,?,?,?,?,?,?,?)`,
        [params.userID, params.firstName, params.lastName, params.DOB, params.city, params.state, params.zipCode,
        params.address, params.userType],
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



app.put('/createGrad', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO Graduate VALUES(?,?,?,?,?)`,
        [params.studentID, params.program, params.yearIn, params.qualifyingExam, params.thesisTitle],
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
app.put('/createUndergrad', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO Undergraduate VALUES(?,?)`,
        [params.studentID, params.yearLevel],
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
app.put('/createFullGrad', (req, res) =>{
    const params = req.body.params;
    db.query(
        `INSERT INTO GradFullTime VALUES(?,?,?)`,
        [params.studentID, params.minCredit, params.maxCredit],
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
            else{
                res.send(result)
            }
        })});

app.get('/getBuildings', (req, res) => {
    db.query(`SELECT * FROM Building`,
    [],
    (err, result) =>{
        if(err){
            res.send({err: err})
        } else{
            res.send(result)
        }
    })})
    
app.get('/getRooms', (req, res) => {
    db.query(`SELECT * FROM Room`,
    [],
    (err, result) =>{
        if(err){
            res.send({err: err})
        } else{
            res.send(result)
        }
        
    })})

app.put('/deleteBuilding', (req,res) => {
    const buildingID = req.body.params.buildingID
    db.query(
        `DELETE FROM Building WHERE buildingID = ?`,
        [buildingID],
        (err, result) =>{
            if(err){
                res.send({err: err})
            } else{
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

app.put('/addRoom', (req, res) => {
    const params = req.body.params;
    db.query(`INSERT INTO Room VALUES(?,?,?)` ,
    [params.roomID, params.buildingID, params.roomType],
    (err, result) =>{
        if(err){
            res.send({err: err})
        } else{
            res.send(result)
        }
        
    }
    )
})

app.put('/deleteRoom' , (req,res) => {
    const roomID = req.body.params.roomID

    db.query(`DELETE FROM Room WHERE roomID = ?`,
    [roomID],
    (err, result) =>{
        if(err){
            res.send({err: err})
        } else{
            res.send(result)
        }
        
    }
    )
})

app.get('/getDepartments', (req,res) => {
    db.query(`SELECT * FROM Department`,
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

app.put('/addRoomOfType' , (req, res) =>{
    const params = req.body.params;
    db.query(`INSERT INTO ${params.roomType} VALUES(?, ?)`,
    [params.roomID, params.capacity],
    (err, result) =>{
        if(err){
            res.send({err: err})
        } else{
            res.send(result)
        }
    }
    )
})
app.put('/addBuilding', (req, res) => {
    const params = req.body.params;
    db.query(`INSERT INTO Building VALUES(?,?)`,
    [params.buildingID, params.buildingUse],
    (err, result) =>{
        if(err){
            res.send({err: err})
        } else{
            res.send(result)
        }
        
    }
    )
})
app.put('/editMS', (req, res) =>{
    const params = req.body.params
    db.query(
        `UPDATE CourseSection SET CRN = ? , timeslotID = ?, facultyID = ?,
        roomID = ?, semesterYearID = ?, courseID = ?, availableSeats = ?, capacity = ?, sectionNum = ?
        WHERE CRN = ?` ,
        [params.CRN, params.timeSlotID, params.facultyID, params.roomID,
        params.semesterYearID, params.courseID, params.availableSeats, params.capacity, params.sectionNum, 
        params.OldCRN],
        (err, result) =>{
            if(err){
                res.send({err: err})
            } else{
                res.send(result)
            }
            
        }
    )
 })
 app.post('/deleteUser', (req, res) => {
     const userID = req.body.params.userID;
     db.query(
         `DELETE FROM User WHERE userID = ?`, 
         [userID],
        (err, result) => {
            if(err){
                res.send({err: err})
            } else{
                res.send(result)
            }
        }
     )
 })

 app.put('/addMS' , (req, res) =>{
    const params = req.body.params
    db.query(
       `INSERT INTO CourseSection VALUES(?,?,?,?,?,?,?,?,?)`,
       [params.CRN, params.timeSlotID, params.facultyID, params.roomID,
       params.semesterYearID, params.courseID, params.availableSeats, 
       params.capacity, params.sectionNum],
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

 app.put('/editCourse', (req, res) =>{
     const params = req.body.params
     db.query(
         `UPDATE Course SET courseID = ?, departmentID = ?, numOfCredits= ?
         WHERE courseID = ?`,
         [params.courseID, params.departmentID, params.credits, params.oldCourseID],
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
         "DELETE FROM CourseSection WHERE CRN = ? ", 
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

 app.post('/checkAvailability', (req, res) =>{
     const timeSlotID = req.body.params.timeSlotID
     const roomID = req.body.params.roomID;
     db.query(
         `SELECT * FROM CourseSection c
         JOIN Timeslot t
         ON c.timeSlotID = t.timeSlotID
         JOIN Room r
         ON c.roomID = r.roomID
         WHERE c.timeSlotID = ? AND r.roomID = ?`,
         [timeSlotID, roomID],
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

 app.put('/unenrollAll' , (req, res) => {
     const CRN = req.body.params.CRN
     db.query(
         "DELETE FROM Enrollment WHERE CRN = ?",
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

 app.put('/deleteCourse', (req, res) => {
     const courseID = req.body.params.courseID
     db.query(
         `DELETE FROM Course WHERE courseID = ? `,
         [courseID],
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

 app.put('/addMS' , (req, res) =>{
     const params = req.body.params
     db.query(
        `INSERT INTO CourseSection VALUES(?,?,?,?,?,?,?,?,?)`,
        [params.CRN, params.timeSlotID, params.facultyID, params.roomID,
        params.semesterYearID, params.courseID, params.availableSeats, 
        params.capacity, params.sectionNum],
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

 app.put('/addMajor', (req, res) => {
     const params = req.body.params;
     db.query(
         "INSERT INTO Major VALUES(?,?,?)",
         [params.majorID, params.departmentID, params.creditsRequired],
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
 app.post('/getFacultyID', (req, res) => {
     const params = req.body.params;
    db.query(
        `SELECT u.userID FROM User u WHERE
        u.firstName = ? AND u.lastName = ? AND u.userType = 'faculty'`,
         [params.firstName, params.lastName],
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

 app.post('/getTimeSlotID', (req, res) => {
    const params = req.body.params;
   db.query(
       `SELECT t.timeslotID
       FROM Timeslot t
       JOIN Period p
       ON t.period = p.periodID
       WHERE p.startTime =? AND p.endTime=? AND t.day = ?`,
        [params.startTime, params.endTime, params.day],
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
 app.put('/addCourse', (req, res) => {
    const params = req.body.params;
    db.query(
        "INSERT INTO Course VALUES(?,?,?)",
        [params.courseID, params.departmentID, params.credits],
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

app.post('/emailExist', (req, res) =>{
    const email = req.body.params.email;
    db.query(
        `SELECT 1 FROM LoginInfo WHERE email = ?`,
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
        `SELECT cs.CRN, cs.sectionNum, cs.courseID, 
        t.day, p.startTime, p.endTime, cs.semesterYearID,
         cs.roomID, u.firstName, u.lastName,
        cs.availableSeats, cs.capacity
        FROM CourseSection cs
        JOIN Course c
        ON cs.courseID = c.courseID
        JOIN User u
        ON cs.facultyID = u.userID
        JOIN TimeSlot t
        ON cs.timeslotID = t.timeslotID
        JOIN Period p
        ON t.period = p.periodID;`,
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

app.post('/addMyClass', (req, res) => {
    const CRN = req.body.params.CRN;
    const userID = req.body.params.userID;
    const currentDate = getDate();

    db.query(
        `INSERT INTO Enrollment VALUES(?,?, 'IP', ?)`,
        [CRN, userID, currentDate],
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

app.put('/deleteDepartment' , (req, res) => {
    const departmentID = req.body.params.departmentID;
    db.query(
        `DELETE FROM Department WHERE departmentID = ?`,
        [departmentID],
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

app.put('/editDepartment' , (req, res) => {
    const params = req.body.params;
    db.query(
        `UPDATE Department SET departmentID =? , roomID=? , dEmail=? , dPhone=? , dChair=? ,
         dManager=?  WHERE departmentID = ?`,
        [params.departmentID, params.roomID, params.dEmail, params.dPhone,params.dChair,
        params.dManager, params.oldID],
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

app.post('/editRoom', (req,res) =>{
    const params = req.body.params;
    db.query(
        `UPDATE Room SET roomID=?, buildingID =? , roomType=? WHERE roomID = ?`,
        [params.roomID, params.buildingID, params.roomType, params.oldid],
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

app.post('/checkRoomOfType' , (req,res) => {
    const roomType = req.body.params.roomType
    db.query(
        `SELECT * FROM ${roomType}`,
        [],
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

app.put('/editBuilding', (req,res) =>{
    const params = req.body.params;
    db.query(
        `UPDATE Building SET buildingID = ?, buidingUse=? WHERE buildingID= ? `,
        [params.buildingID, params.buildingUse, params.oldid],
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

app.post('/dropMyClass', (req, res) =>{
    const CRN = req.body.params.CRN;
    const userID = req.body.params.userID;

    db.query(
        `DELETE FROM Enrollment WHERE CRN = ? AND studentID = ?`,
        [CRN, userID],
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