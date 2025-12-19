const Skill = require("../model/skills.js");
//Create New Skill
module.exports.createSkill = async(req, res)=>{
    const {name, image } = req.body;
    if(!name || !image){
        return res.status(400).json({
            message : "both are required"
        });
    }


    try{
        const newSkill = new Skill({
            name : name,
            image : image,
        });

        const result = await newSkill.save();

        return res.status(200).json({
            message : "skill added successfully",
            skill : result,
        });
    }
    catch(err){
        console.error(err);

        if(err.code === 11000){
            return res.status(409).json({
                message : "This Skills already exists",
            });
        };

        return res.status(500 || err.status).json({
            message : err.message || "Internal server error",
        });
    };
}
//Getting all skills
module.exports.getSkills = async(req, res)=>{
    console.log("request");
    try{
        const skills = await Skill.find({});
        res.status(200).json({
        skills : skills,
        message : "Send successfully",
        });
    }   
    catch(err){
        res.status(401).json({
            message : err.message || "Internal server error",
        });
    };
}

module.exports.deleteSkill = async(req, res)=>{
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            message : "Id not found",
        });
    }
    else{
        try{
            const deletedData = await Skill.findByIdAndDelete(id);
            if(!deletedData){
            return res.status(400).json({
                message : "Not find any data for update"
             });
            }

            else{
                return res.status(200).json({
                    message : "Deleted SuccesFully",
                });
            };
        }
        catch(err){
            return res.status(500).json({
                message : err.message || "Internal server Error",
            })
        }

    }
};

module.exports.getSkill = async(req, res)=>{
    // const { name } = req.params;
    // console.log(name);
    if(!req.params.name){
        return res.status(200).json({
            message : "Skill not recieved",
        });
    }
    
    try{
        const skill = await Skill.findOne({name : req.params.name});
        if(!skill){
            return res.status(400).json({
                message : "not found",
            });
        }
        else{
            return res.status(200).json({
                message : "Successfully fetched",
                skill,
            });
        };
    }catch(err){

    }

};

module.exports.updateSkill = async(req, res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            message : "Id required for update"
        });
    };
    if(typeof(req.body) === "undefined")
    {
        return res.status(400).json({
            message : "Some field requied for update",
        });
    };
    const dataForUpdate = {};
    if(req.body.image) dataForUpdate.image = req.body.image;
    if(req.body.name) dataForUpdate.name = req.body.name;

    try{
        const updatedData = await Skill.findByIdAndUpdate(
            id,
            dataForUpdate,
            {
                new : true,
                runValidators : true
            }
        );
        console.log("Updated Successfully");
        return res.status(200).json({
            message : "Updated Successfully",
            skill : updatedData
        });
    }
    catch(err){
        if(err.code === 11000){
            return res.status(401).json({
                message : err.message || "Already Exists",
            });
        }
        else{
            return res.status(res.status || 500).json({
                message : err.message || "Internal Server Error",
            });
        };
    };
};