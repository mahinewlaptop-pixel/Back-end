const Education = require("../model/education.js");

module.exports.getEdu = async(req, res)=>{
    
    try{
        const educations = await Education.find({});

        console.log("Details sended successfully");
        return res.status(200).json({
            message : "Complete Education sended in the form of an array of object",
            educations : educations,
        });
    }
    catch(err){
        return res.status(err.status || 500).json({
            message : err.message || "Internal server Error",
        });
    };
};

module.exports.deleteEdu = async(req, res)=>{
    if(!req.params.id){
        return res.status(400).json({
            message : "Without Id kisko delete karu tu hi bta de",
        });
    }

    try{
        const deletedEducation = await Education.findByIdAndDelete(req.params.id);
        if(!deletedEducation){
            return res.status(404).json({
                message : "404 not found for Deletion",
            });
        };

        return res.status(200).json({
            message : "Deleted Successfully",
            education : deletedEducation,
        });
    }
    catch(err){
        return res.status(err.status || 500).json({
            message : err.message || "Internal server error"
        });
    };
};

module.exports.setEdu =async(req, res)=>{
    const {institute, university, course, totalMarks, obtainedMarks, year} = req.body;
    if(!institute || !university || !course || !totalMarks || !obtainedMarks || !year){
        return res.status(400).json({
            message : "Bhai sab field bhejo",
        });
    };

    try{
        const addedData = new Education({
            institute : institute,
            university : university,
            course : course,
            totalMarks : totalMarks,
            obtainedMarks : obtainedMarks,
            year : year
        });

        const result = await addedData.save();

        console.log("Details added successfully");

        return res.status(200).json({
            message : "Details added Successfully",
            education : result,
        });
    }
    catch(err){
        if(err.code===11000){
            return res.status(401).json({
                message : err.message || "Course should be unique",
            });
        }
        else{
            return res.status(500).json({
                message : "Internal server error",
            });
        };
    };
};

module.exports.updateEdu = async(req, res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            message : "Id required for updation",
        });
    };

    if(typeof(req.body) === "undefined"){
        return res.status(400).json({
            message : "Kuch to bhej kya update karu",
        });
    };

    const dataForUpdate = {};
    if(req.body.institute) dataForUpdate.institute = req.body.institute;
    if(req.body.university) dataForUpdate.university = req.body.university;
    if(req.body.year) dataForUpdate.year = req.body.year;
    if(req.body.obtainedMarks) dataForUpdate.obtainedMarks = req.body.obtainedMarks;
    if(req.body.totalMarks) dataForUpdate.totalMarks = req.body.totalMarks;
    if(req.body.course) dataForUpdate.course = req.body.course;

    try{
        const result =await Education.findByIdAndUpdate(
            id,
            dataForUpdate,
            {
                new : true,
                runValidators : true,
            }
        );

        if(!result){
            return res.status(404).json({
                message : "Not Found",
            });
        };
        console.log("Updated successfully");
        return res.status(200).json({
            message : " Details Updated Successfully",
            education : result
        });
    }
    catch(err){
        if(err.code === 11000){
            return res.status(401).json({
                message : "Details already exists",
            });
        }
        else{
            return res.status(500).json({
                message : err.message || "internal server error",
            });
        };
    };
};