const express = require('express')
const mysql = require('mysql')
const app = express();
const port = 8000;
const cors = require("cors");

app.use(express.json());
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
                console.log(result)
                res.send(result)
             } 
        }
    )
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});