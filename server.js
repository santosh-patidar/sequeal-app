var bodyParser = require('body-parser')
const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');
const dbconnect = require('./config/dbconfig')
const sequelize = require('./config/db.connect');



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// app.use (bodyParser.json());

app.use(cors('Access-Control-Allow-Origin', '*'));


// Routes   
app.get('/', function (req, res) {
  console.log("Sequelize on");
  res.send("Sequelize Server connected");
})
require('./Middleware/upload')(app);
require('./routes/user.routers')(app);
//Port 
const port = process.env.PORT || 3000;

app.listen(port, '192.168.1.96', () => console.log('Express server is runnig at port no : 3000'));
