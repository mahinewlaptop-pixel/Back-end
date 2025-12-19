const mongoose = require("mongoose");

const educationSchema = mongoose.Schema({
    course : {
        type : String,
        required : true,
        unique : true
    },
    year : {
        type : Date,
        required : true
    },
    totalMarks : {
        type : Number,
        required : true
    },
    obtainedMarks : {
        type : Number,
        required : true
    },
    university : {
        type : String,
        required : true
    },
    institute : {
        type : String,
        required : true
    }
});

const Education = mongoose.model("Education", educationSchema);
module.exports = Education;