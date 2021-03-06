const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('passport-jwt');
const config = require('../config/database');

// regiseter
router.post('/register', (req, res, next) => {

    console.log("req ==>", req);
    // define new User object to be sent to server
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password 
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Fail to register user' });
        } else {
            res.json({ success: true, msg: 'User registered' });
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUserName(username, (err, user) => {
        if (err)
            throw err;

        if (!user)
            return res.json({ success: false, msg: "user not found" });

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({success: true, token: 'JWT ' + token, user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email
                }});
            } else {
                return res.json({ success: false, msg: "Wrong password.." });
            }
            


        })
    })
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send("Profile");
});

module.exports = router;