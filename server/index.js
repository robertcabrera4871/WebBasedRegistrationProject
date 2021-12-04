
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



app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});