
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
// const mongoose = require('mongoose');

const app = express();

// set port to serve backend
const port = 3000;

// load routing defined in users file. 
//this is better than defining all the rouring in one file
const users = require('./routes/users');
app.use('/users', users);

// CORS middleware
app.use(cors());

// set static folder to serve ui angular part
app.use(express.static(path.join(__dirname, 'public')));

// body parser middleware
// Parse incoming request bodies in a middleware before your handlers.
app.use(bodyParser.json());

// Index route 
// use this route for any request that doesn't matach any route
app.get('/', (req, res) =>{
    res.send("Invalid endpont");
})

// Start server
app.listen(port, () =>{
    console.log("server started on port " + port); 
});  