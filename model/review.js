const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    name : {
        type : String,
        default : "Anonymous",
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    subject : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;