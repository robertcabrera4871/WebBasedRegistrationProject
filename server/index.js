
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
    multipleStatements: true
});

// const db = mysql.createConnection({
//     user: "admin",
//     host: "webregistrationdb.cmfdjpexlzt4.us-east-2.rds.amazonaws.com",
//     password: "password",
//     database: "test",
//     multipleStatements: true
// });


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
app.put('/newDepAssign', (req,res) =>{
    const newRow = req.body.params.newRow
    const date = getDate();
    db.query(
        `INSERT INTO FacultyDepartment VALUES(?,?,?,?)`,
        [newRow.facultyID, newRow.departmentID, newRow.percTimeCommitment, date],
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
app.post('/deleteDepAppt', (req,res) =>{
    const row = req.body.params.row
    db.query(
        `DELETE FROM FacultyDepartment WHERE facultyID = ? AND departmentID = ?`,
        [row.facultyID, row.departmentID],
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
app.post('/getFacultyDepartment', (req,res) =>{
    const params = req.body.params
    db.query(
        `SELECT * FROM FacultyDepartment WHERE departmentID = ?`,
        [params.departmentID],
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
app.post('/updateFullPartFac', (req, res) => {
    const params = req.body.params;
    db.query(
        `UPDATE ${params.fullpart}timeFac SET minCourse = ?, maxCourse = ?
        WHERE facultyID = ?`,
        [params.minCourse, params.maxCourse, params.userID],
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
    var email = req.body.email;
    email = email+'%'
    const password = req.body.password;
    db.query(
        "SELECT * FROM LoginInfo WHERE email LIKE ? AND password = ?",
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

app.post('/getUser', (req, res) =>{
    const userID = req.body.params.userID
    db.query(
        'SELECT * FROM User WHERE userID = ?',
        [userID],
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

app.post('/updateUser', (req, res) =>{
    const newRow = req.body.params.newRow
    db.query(
        `UPDATE User SET firstName = ?, lastName = ?, DOB = ?,
         city = ?, state = ?, zipCode = ?, address = ?, userType = ? WHERE userID = ?`,
        [newRow.firstName, newRow.lastName, newRow.DOB, newRow.city, newRow.state, newRow.zipCode,
        newRow.address,newRow.userType,newRow.userID ],
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

app.post('/updateResearch', (req, res) =>{
    const newRow = req.body.params.newRow
    db.query(
        `UPDATE ResearchStaff SET status = ? WHERE researchID = ?`,
        [newRow.status,newRow.userID ],
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


app.post('/updateStudent', (req, res) =>{
    const newRow = req.body.params.newRow
    db.query(
        `UPDATE Student SET yearLevel = ?, yearOfEntrance = ? WHERE studentID = ?`,
        [newRow.yearLevel,newRow.yearOfEntrance, newRow.userID ],
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


app.post('/updateUndergrad', (req, res) =>{
    const newRow = req.body.params.newRow
    db.query(
        `UPDATE Undergraduate SET yearLevel = ? WHERE studentID = ?`,
        [newRow.yearLevel,newRow.yearOfEntrance, newRow.userID ],
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
app.post('/updateGrad', (req, res) =>{
    const newRow = req.body.params.newRow
    db.query(
        `UPDATE Graduate SET program = ?, yearIn = ?, qualifyingExam = ?, thesisTitle = ? WHERE studentID = ?`,
        [newRow.program,newRow.yearIn, newRow.qualifyingExam, newRow.thesisTitle, newRow.userID],
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

app.post('/updateLogin', (req, res) =>{
    const newRow = req.body.params.newRow
    db.query(
        `UPDATE LoginInfo SET email = ?, password = ?, status = ?  WHERE userID = ?`,
        [newRow.email, newRow.password, newRow.status, newRow.userID],
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

app.post('/getStudent', (req, res) =>{
    const userID = req.body.params.userID
    db.query(
        'SELECT * FROM Student WHERE studentID = ?',
        [userID],
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

app.post('/getGrad', (req, res) =>{
    const userID = req.body.params.userID
    db.query(
        'SELECT * FROM Graduate WHERE studentID = ?',
        [userID],
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
       `INSERT INTO CourseSection(CRN, timeslotID, facultyID, roomID, semesterYearID,
        courseID, availableSeats, capacity)
        VALUES(?,?,?,?,?,?,?,?)`,
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
 
 app.post('/checkAvailableSeats', (req, res) =>{
    const CRN = req.body.params.CRN
    db.query(
        `SELECT availableSeats FROM CourseSection WHERE CRN = ?`,
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

app.post('/minusAvailableSeats', (req, res) =>{
    const CRN = req.body.params.CRN
    db.query(
        `UPDATE CourseSection cs SET availableSeats = (cs.capacity - (
            SELECT COUNT(*) FROM Enrollment e WHERE cs.CRN = e.CRN
        )) WHERE cs.CRN = ?`,
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

app.post('/plusAvailableSeats', (req, res) =>{
    const CRN = req.body.params.CRN
    db.query(
        `UPDATE CourseSection cs SET availableSeats = (cs.capacity + (
            SELECT COUNT(*) FROM Enrollment e WHERE cs.CRN = e.CRN
        )) WHERE cs.CRN = ?`,
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

 app.put('/addMinor', (req, res) => {
    const params = req.body.params;
    db.query(
        "INSERT INTO Minor VALUES(?,?,?)",
        [params.minorID, params.departmentID, params.creditsRequired],
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

app.put('/addMajReq', (req, res) => {
    const params = req.body.params;
    db.query(
        "INSERT INTO MajorRequirements VALUES(?,?,?)",
        [params.newReq.courseID, params.majorID, params.newReq.minCourseGrade],
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
app.put('/addMinReq', (req, res) => {
    const params = req.body.params;
    db.query(
        "INSERT INTO MinorRequirements VALUES(?,?,?)",
        [params.newReq.courseID, params.minorID, params.newReq.minCourseGrade],
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
        u.firstName = ? AND u.lastName = ? AND u.userType = 'Faculty'`,
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

 app.post('/getFacultyHistory', (req, res) => {
    const params = req.body.params;
   db.query(
       `SELECT * FROM FacultyHistory WHERE facultyID = ?`,
        [params.facultyID],
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
app.post('/deleteFacHistory', (req, res) => {
    const params = req.body.params;
   db.query(
       `DELETE FROM FacultyHistory WHERE CRN = ?`,
        [params.CRN],
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

app.put('/addFacHistory', (req, res) => {
    const newRow = req.body.params.newRow;
   db.query(
       `INSERT INTO FacultyHistory VALUES(?,?,?) `,
        [newRow.CRN, newRow.facultyID, newRow.semesterYearID],
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

 app.post('/getFacRank', (req, res) => {
    const params = req.body.params;
   db.query(
       `SELECT rank FROM Faculty WHERE facultyID = ?`,
        [params.userID],
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

app.post('/getMinMax', (req, res) => {
    const params = req.body.params;
   db.query(
       `SELECT minCourse, maxCourse FROM ${params.fullpart}timefac WHERE facultyID = ?`,
        [params.userID],
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

app.post('/getLoginInfo', (req, res) => {
    const params = req.body.params;
   db.query(
       `SELECT * FROM LoginInfo WHERE userID = ?`,
        [params.userID],
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
    var email = req.body.params.email;
    email = email + "%";
    db.query(
        `SELECT 1 FROM LoginInfo WHERE email LIKE ? `,
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
        cs.roomID, u.firstName, u.lastName, u.userID,
        cs.availableSeats, cs.capacity, c.numOfCredits
        FROM CourseSection cs
        JOIN Course c
        ON cs.courseID = c.courseID
        JOIN User u
        ON cs.facultyID = u.userID
        JOIN Timeslot t
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

app.get('/getFallCal', (req, res) =>{
    db.query(
        `SELECT * FROM AcademicCalendarFall`,
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
app.get('/getSpringCal', (req, res) =>{
    db.query(
        `SELECT * FROM AcademicCalendarSpring`,
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



app.post("/getClassList", (req, res)=> {
    const CRN = req.body.params.CRN
    db.query(
        `SELECT u.firstName, u.lastName, e.CRN, e.enrollDate, e.grade, e.studentID
         FROM Enrollment e
         JOIN User u 
         ON e.studentID = u.userID
         WHERE CRN = ?`,
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

app.post("/getAttendence", (req, res)=> {
    const CRN = req.body.params.CRN
    db.query(
        `SELECT u.userID, u.firstName, u.lastName, a.meetingDate, a.presentOrAbsent 
        FROM Attendance a
        Join User u
        ON a.studentID = u.userID
         WHERE CRN = ?`,
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

app.post("/switchAttendence", (req, res)=> {
    const params = req.body.params
    db.query(
        `UPDATE Attendance SET presentOrAbsent = ? WHERE studentID = ? AND meetingDate = ?`,
        [params.presence, params.userID,params.meetingDate ],
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
app.post("/createAttendence", (req, res)=> {
    const params = req.body.params
    db.query(
        `INSERT INTO Attendance VALUES(?,?,?, false)`,
        [params.CRN, params.studentID, params.date],
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
app.post("/assignGrade", (req, res)=> {
    const params = req.body.params
    db.query(
        `UPDATE Enrollment SET grade = ? WHERE studentID = ?`,
        [params.grade, params.studentID],
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

app.post("/deleteAttendence", (req, res)=> {
    const date = req.body.params.date
    db.query(
        `DELETE FROM Attendence WHERE meetingDate = ?`,
        [date],
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


app.post("/deleteAttendenceByID", (req, res)=> {
    const userID = req.body.params.userID
    db.query(
        `DELETE FROM Attendence WHERE studentID = ?`,
        [userID],
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





app.post("/checkSemesterYear", (req, res)=> {
    const semesterYearID = req.body.params.semesterYearID
    db.query(
        `SELECT * FROM SemesterYear WHERE semesterYearID = ?`,
        [semesterYearID],
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



app.post("/checkCRNsemester", (req, res)=> {
    const row = req.body.params.row
    db.query(
        `SELECT COUNT(*) FROM CourseSection WHERE semesterYearID = ? AND CRN = ?`,
        [row.semesterYearID, row.CRN],
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
app.post('/myMinorRequirements',  (req, res) =>{
    const userID = req.body.params.userID
    db.query(
        `SELECT * FROM MinorRequirements r
        WHERE r.courseID NOT IN(
        SELECT c.courseID  FROM StudentHistory h
        JOIN Enrollment e
        ON h.studentID = ? OR e.studentID = ?
        JOIN CourseSection c 
        ON h.CRN = c.CRN);`,
        [userID, userID],
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
app.post('/myMajorRequirements',  (req, res) =>{
    const userID = req.body.params.userID
    db.query(
        `SELECT * FROM MajorRequirements r
        WHERE r.courseID NOT IN(
        SELECT c.courseID  FROM StudentHistory h
        JOIN Enrollment e
        ON h.studentID = 's' OR e.studentID = 's'
        JOIN CourseSection c 
        ON h.CRN = c.CRN)`,
        [userID, userID],
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

app.post('/editCalDesc',  (req, res) =>{
    const params = req.body.params
    db.query(
        `UPDATE AcademicCalendar${params.semester} SET Description = ? WHERE Title = ?`,
        [params.description, params.title],
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



app.post('/deleteMajorReq',  (req, res) =>{
    const params = req.body.params;
    db.query(
        'DELETE FROM MajorRequirement WHERE courseID = ? AND majorID = ?',
        [params.courseID, params.majorID],
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
app.post('/deleteMinorReq',  (req, res) =>{
    const params = req.body.params;

    db.query(
        'DELETE FROM MinorRequirement WHERE courseID = ? AND minorID = ?',
        [params.courseID, params.minorID],
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
app.post('/deleteMajor',  (req, res) =>{
    const params = req.body.params;

    db.query(
        'DELETE FROM Major WHERE majorID = ?',
        [params.majorID],
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
app.post('/deleteMinor',  (req, res) =>{
    const params = req.body.params;

    db.query(
        'DELETE FROM Minor WHERE minorID = ?',
        [params.minorID],
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
        `SELECT f.FirstName, f.lastName, f.userID, a.dateOfAppointment
        FROM FacultyAdvising a
        JOIN User f
        ON studentID=?
        WHERE a.facultyID = f.userID;
       `,
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

app.post('/myAdvisees', (req, res) =>{
    const facultyID = req.body.params.userID;
    db.query(
        ` SELECT s.FirstName, s.lastName, s.userID, a.dateOfAppointment
        FROM FacultyAdvising a
        JOIN User s
        ON facultyID= ?
        WHERE a.studentID = s.userID;`,
    [facultyID],
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

app.put('/addAdvising', (req, res) =>{
    const newRow = req.body.params.newRow;
    const date = getDate();
    db.query(
        `INSERT INTO FacultyAdvising VALUES(?, ?, ?)`,
    [newRow.facultyID, newRow.studentID, date],
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

app.post('/deleteAdvising', (req, res) =>{
    const params = req.body.params;
    db.query(
        `DELETE From FacultyAdvising WHERE
        (facultyID = ? AND studentID = ?) OR
        (facultyID = ?  AND studentID = ?)
        `,
    [params.facultyID, params.studentID, params.studentID, params.facultyID],
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

app.post('/getStudentHistory', (req, res) =>{
    const userID = req.body.params.userID;
    db.query(
        `SELECT * FROM StudentHistory where studentID = ?`, [userID],
    (err, result) =>{
        if(err){
            res.send({err: err})
        }else{
            res.send(result)
        }
    }
    )
})

app.post('/addStudentHistory', (req, res) =>{
    const newRow = req.body.params.newRow;
    db.query(
        `INSERT INTO  StudentHistory VALUES(?,?,?,?)`, [newRow.CRN, newRow.studentID, newRow.semesterYearID, newRow.grade],
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

app.post('/addTeachClass', (req, res) => {
    const CRN = req.body.params.CRN;
    const userID = req.body.params.userID;

    db.query(
        `UPDATE CourseSection SET facultyID = ? WHERE CRN = ?`,
        [ userID, CRN],
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
        WHERE cs.CRN LIKE  '3%'`,
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
app.get('/getUndergradCourses', (req,res) =>{

    db.query(
        `SELECT cs.courseID, c.departmentID, c.numOfCredits
        FROM CourseSection cs
        JOIN Course c
        ON cs.courseID = c.courseID
        WHERE cs.CRN LIKE  '2%'`,
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
        `
        SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM Enrollment WHERE CRN = ? AND studentID = ?;
        SET FOREIGN_KEY_CHECKS=1;`,
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
        `SELECT h.holdID, h.holdType, s.dateOfHold
        FROM Hold h
        JOIN StudentHold s
        ON h.holdID = s.holdID
        WHERE s.studentID = ?;
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

app.post('/dropHold', (req, res) =>{
    const params = req.body.params
    db.query(
        `DELETE FROM StudentHold WHERE holdID = ? AND studentID = ?`,
    [params.holdID, params.userID],
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
app.post('/assignHold', (req, res) =>{
    const studentID = req.body.params.userID;
    const holdID = req.body.params.holdID;
    const currentDate = getDate()
    db.query(
        `INSERT INTO StudentHold VALUES(?,?,?)`,
    [studentID, holdID, currentDate],
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