const Project = require("../model/project.js");

module.exports.getProject = async(req, res)=>{
    try{
        const allProject = await Project.find({});
        console.log("Fetching successed");
         return res.status(200).json({
            message : "Fetched all project successfully",
            projects : allProject
         });
    } 
    catch(err){
        res.status(err.status || 500).json({
            message : err.message || "Internal Server Error"
        });
    };

}

module.exports.setProject = async(req, res)=>{
    
    if(typeof(req.body) === "undefined"){
        return res.status(400).json({
            message  : "kuch data recieved nhi hua ",
        });
    };
    console.log(req.body);
    const {title, image, skill,  description, github, link } = req.body;

    if(!title || !image || !skill || !description || !github || !link ){
        return res.status(400).json({
            message : "All fields required",
        });
    }

    try{
        const newProjet = new Project({
            title : title,
            image : image,
            description : description,
            skill : skill,
            github : github,
            link : link,
        });

        const result = await newProjet.save();
        console.log("Project added successfully");
        return res.status(200).json({
            message : "Project Added Successfully",
            Project : result,
        });
    }
    catch(err){
        if(err.code === 11000){
            return res.status(401).json({
                message : "This project already exists",
            });
        }
        else{
            return res.status(500).json({
                message : "internal server error",
            });
        };
    };
};

module.exports.updateProject = async(req, res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            message : "Id not recieved",
        });
    }
    if(typeof(req.body) === "undefined"){
        return res.status(400).json({
            message : "Data does not recieve empty form can't processed"
        });
    };
    const dataForUpdate = {};
    if(req.body.image) dataForUpdate.image = req.body.image;
    if(req.body.title) dataForUpdate.title = req.body.title;
    if(req.body.link) dataForUpdate.link = req.body.link;
    if(req.body.description) dataForUpdate.description = req.body.description;
    if(req.body.github) dataForUpdate.github = req.body.github;
    if(req.body.skill) dataForUpdate.skill = req.body.skill;

    try{
        const updatedProject = await Project.findByIdAndUpdate(
            id,
            dataForUpdate,
            {
                new : true,
                runValidators : true
            }
        )
        console.log("Data Updated successfully");
        return res.status(200).json({
            message : "Data Updated Success fully ",
            Project : updatedProject
        });
    }
    catch(err){
        if(err.code === 11000){
            return res.status(401).json({
                message : "Data already exists",
            });
        }
        else{
            return res.status(500).json({
                message : "Internal server error",
            })
        }
    }
    

};

module.exports.deleteProject = async(req, res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({
            message : "Kuch ID recieved nhi hua"
        });
    }

    try{
        const deletedProject = await Project.findByIdAndDelete(id);
        console.log("Deleted project success");

        if(!deletedProject){
            return res.status(404).json({
                message : "Data Not found to delete",
            });
        };

        return res.status(200).json({
            message : "Succesfully deleted",
            project : deletedProject
        });
    }
    catch(err){
        return res.status(err.status || 500).json({
            message : err.message || "Internal Server Error"
        });
    };
};

module.exports.getTitle = async(req, res)=>{
    try{
        if(!req.params.title){
        return res.status(400).json({
            message : "title not recieved",
        });
        }
        else{
            const project = await Project.findOne({title : req.params.title});
            if(!project){
                return res.status(404).json({
                    message : "Not found in db",
                });
            }
            else{
                res.status(200).json({
                    message : "Sended Successfully",
                    project
                });
            }
    
        }
    }catch(err){
       return res.status(500).json({
        message : err.message,
       })
    }


};

module.exports.updateFull = async(req, res)=>{
    if(typeof(req.body) === "undefined"){
        return res.status(400).json({
            message : "No any data recieved from user"
        });
    }
    const { id } = req.params;
    const {title, skill, description, image, link, github} = req.body;

    if(!title || !skill || !description || !image || !link || !github){
        return res.status(400).json({
            messsage : "Galat Baat hai! Sara field fill karo"
        });
    };

    try{
        const updatedProject = await Project.findByIdAndUpdate(
            {
                _id : id
            }, 
            {
                title : title,
                description : description,
                link : link,
                image : image,
                github : github,
                skill : skill
            },
            {
                new : true,
                runValidators : true
            });
            console.log("Project Updated successfully");
        
        return res.status(200).json({
            message : "Project Updated Successfully",
            project : updatedProject
        });
    }
    catch(err){
        if(err.code === 11000){
            return res.status(401).json({
                message : "already exists project"
            });
        }
        else{
            return res.status(err.status || 500).json({
                message : "Internal server error"
            });
        };
    };
};