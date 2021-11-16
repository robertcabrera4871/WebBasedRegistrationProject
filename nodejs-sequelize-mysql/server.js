const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

const db = require("./models");

// db.sequelize.sync().then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(cors(corsOptions));
// app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

//Will be more specific then use later Tutorial!!!!!
// app.use('/login', (req, res) => {
//   res.send({
//     token: 'test123'
//   })
// })

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});