/*
we utilize MongoDB as the database for storing data. 
The models and schemas are defined using Mongoose, a MongoDB object modeling tool.
*/

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required: true},
});

module.exports = mongoose.model("User",UserSchema);