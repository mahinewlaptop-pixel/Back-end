const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true,
    },
    image : {
        type : String,
        required : true,
        unique : true,
    },
    skill : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    github: {
        type : String,
        required : false,
    },

    link: {
        type : String,
        required : false,
        unique : true,
    }
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;