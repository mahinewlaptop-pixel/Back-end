const User = require("../model/user.js");
const { setEdu } = require("./eduController.js");

module.exports.getProfile = async(req, res)=>{
    try{
        const user = await User.find({});
        if(!user){
            return res.status(404).json({
                message : "User not Found"
            });
        }

        console.log("User Sended");
        return res.status(200).json({
            message : "Sended",
            name : user[0].name,
            image : user[0].image,
            about : user[0].about,
            email : user[0].email,
            mobile : user[0].mobile,
            location : user[0].location,
            greet : user[0].greet,
            backgroundImage : user[0].backgroundImage,
            resume : user[0].resume,
            _id : user[0]._id,
        });
    }
    catch(err){
        return res.status(500).json({
            message : "Internal server error",
        });
    }
};


module.exports.updateProfile = async(req, res)=>{
    const userId = req.params.id;
    if(!req.body.greet || !req.body.name || !req.body.image || !req.body.about || !req.body.resume ){
        return res.status(400).json({
            message : "All fields Required"
        });
    }
    try{
        const updatedData = await User.findByIdAndUpdate(userId,req.body,
        {
            new : true,
            runValidators : true,
        });

        if(!updatedData){
            return res.status(404).json({
                message : `User with Id ${userId} not found.`,
            });
        }
        return res.status(200).json({
            message : "Profile updated successfully",
            data : updatedData,
        });
    }
    catch(error){
        console.error("Updated Error : ", error);
        return res.status(500).json({
            message : "internal server error"
        });
    }
}

module.exports.updateContact = async (req, res) => {

    const { id } = req.params;

    const updates = req.body;
    if (!req.body.mobile || !req.body.email || !req.body.location) {
        return res.status(400).json({ message: "Update data required in request body" });
    }

    try {
        const updatedContact = await User.findByIdAndUpdate(
            id,
            { 
                $set: {
                    mobile: updates.mobile,
                    email: updates.email,
                    location: updates.location,
                }
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedContact) {
            return res.status(404).json({ message: "User not found in DB" });
        }

        res.status(200).json({
            message: "Contact Updated successfully",
            contact: {
                mobile: updatedContact.mobile,
                email: updatedContact.email,
                location: updatedContact.location,
                _id: updatedContact._id,
            },
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        
        if (err.code === 11000) {
            return res.status(409).json({ message: "Duplication error: Email or Mobile already exists." }); // 409 Conflict is better than 401
        }
        console.error("Update Contact Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};