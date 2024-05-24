const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
    username: {type:String, unique:true},
    password: String,
    techstacks:[String],
    desc:String,
    email:String,
    github:String,
    languages:[String],
    frameworks:String
},{ 
    collection:"users"
});

mongoose.model("users",userDetailSchema);