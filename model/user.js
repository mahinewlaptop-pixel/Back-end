const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : false,
        default : "https://drive.google.com/file/d/1dzrSqeq5FqM_dvfgYK3mhkp9TsWUqqp6/view?usp=drivesdk"
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    about : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
    },
    location : {
        type : String,
    },
    backgroundImage : {
        type : String,
        default : "https://media.istockphoto.com/id/607280514/photo/lupins-of-lake-tekapo.jpg?s=612x612&w=0&k=20&c=TLqHmSwcHKT1wR6U7H1KCJMmIq3SrgqHNOEyvziSCSg=",
    },
    greet : {
        type : String,
        default : "Hello I am"
    },
    resume : {
        type : String,
        default : "https://drive.google.com/file/d/1iQ-wuIVemj22SLOg41742hADM8Tiwpeq/view?usp=drivesdk"
    }
});

const User = mongoose.model("User", userSchema);

module.exports= User;