
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
// const mongoose = require('mongoose');

const app = express();

const users = require('./routes/users');
const port = 3000;

// CORS middleware
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index route
app.get('/', (req, res) =>{
    res.send("Invalid endpont");
})

// Start server
app.listen(port, () =>{
    console.log("server started on port " + port); 
});  