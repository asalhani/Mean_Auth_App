const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('passport-jwt');

// regiseter
router.post('/register', (req, res, next) =>{
    
    console.log("req ==>", req);
    // define new User object to be sent to server
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) =>{
        if(err){
            res.json({success: false, msg: 'Fail to register user'});
        } else{
            res.json({success: true, msg: 'User registered'});
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) =>{
    res.send("Authenticate");
});

// Profile
router.get('/profile', (req, res, next) =>{
    res.send("Profile");
});

module.exports = router;