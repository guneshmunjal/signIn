const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:["visitor","student","admin"]
    }

    });

    module.exports = mongoose.model("userSchema",userSchema);

