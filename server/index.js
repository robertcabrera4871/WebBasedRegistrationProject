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
                console.log(result) 
                // res.send({token: 'test123'});
                res.send(result)
             } 
             else{
                res.send({message: "Wrong combination"});
                }
            }
    );
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});