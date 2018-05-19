const mongose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// define user schema
const UserSchema = mongose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// expose User object to outside after pushing it to MongoDB
const User = module.exports = mongose.model('User', UserSchema);

// define a new function [getUserById] and expose it to outside
module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUserName = function (username, callback) {
    // write a JSON query to be excuted by mongose aginst MongoDB
    const query = { username: username };

    // Excute the query aginst db
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    // hash password 
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}


