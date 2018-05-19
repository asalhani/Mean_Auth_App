const mongose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// define user schema
const UserSchema = mongose.Schema({
    name: {
        type: string
    },
    email:{
        type: string,
        required: true
    },
    username:{
        type: string,
        required: true
    },
    password:{
        type: string,
        required: string
    }
});

// expose User object to outside after pushing it to MongoDB
const User = module.exports = mongose.model('User', UserSchema);

// define a new function [getUserById] and expose it to outside
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUserName = function(username, callback){
    // write a JSON query to be excuted by mongose aginst MongoDB
    const query = {username: username};

    // Excute the query aginst db
    User.findOne(query, callback);
}


