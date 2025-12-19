const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user.js");


const Review = require("./model/review.js");

const bcrypt = require("bcrypt");
const app = express();

const skillRouter = require("./Router/skillRouter.js");
const projectRouter = require("./Router/projectRouter.js");
const eduRoutes = require("./Router/eduRouter.js");
const profileRouter = require("./Router/profileRouter.js");

require("dotenv").config();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors());

(
    ()=>{
        mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to DB")).catch((err)=>{console.log(err.message)});
    }
)();

app.use("/skill", skillRouter);
app.use("/project", projectRouter);
app.use("/edu", eduRoutes);
app.use("/profile", profileRouter);

// ye reset password ke liye (U)
app.post("/reset", async(req,res)=>{
    const {email, name, secret, password, image, about, mobile, location } = req.body;
    
    if(!email || !secret || !password){
        return res.status(401).json({
            message : "All field required",
        });
    };

    if(secret !== process.env.SECRET_OTP){
        return res.status(401).json({
            message : "Wrong Secret Code",
        });
    }

    try{
        const newHashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT));

        const user = await User.findOneAndUpdate(
            {
                name : name, email : email
            },
            {
                password : newHashedPassword,
                image : image, about : about,
                location : location,
                mobile : mobile,
            },
            {
                new : true,
                runValidators : true,
            },
        );

        if(!user){
            return res.status(404).json({
                message : "User not Found"
            });
        }
        else{
            return res.status(200).json({
                message : "Password reset successfully",
                user : user
            });
        } 
    } catch(err){
         console.error("Password reset Error :", err.message);
         return res.status(500 || err.status).json({
            message : err.message || "Internal server error Password not reset"
         }) ;
        };
});

// ye sign up ker lega (C)

app.post('/signup', async(req, res)=>{
    console.log("request recieved");
    const { newPassword, confirmPassword, name, image, email, about, mobile, location, backgroundImage, greet , resume} = req.body;
    if(!name || !image || !email || !confirmPassword || !newPassword || !about || !mobile || !location || !backgroundImage || !greet || !resume){
        return res.status(400).json({message : "All field required"});
    };

    if(newPassword !== confirmPassword){
        return res.status(400).json({message : "New password and confirm password required same"});
    }

    try{
        const hashedPassword = await bcrypt.hash(confirmPassword, parseInt(process.env.SALT));
        const newUser = new User({
            name : name,
            email : email,
            password : hashedPassword,
            image : image,
            about : about,
            mobile : mobile,
            location : location,
            backgroundImage : backgroundImage,
            greet : greet,
            resume : resume
        });
        
        const result = await newUser.save();
        return res.status(200).json({
            message : "User Signed Up Successfully",
            user : result,
        });
    }
    catch(error){
        if(error.code === 11000){
            return res.status(409).json({message : "Already exists email"})
        }
        console.error("Signup Error", error);
        return res.status(error.status || 500).json({
            message : error.message,
        });
    };
});

// ye login check ker lega (R)
app.post("/login", async(req, res)=>{
    const { email, password } = req.body;
    if(!email || ! password){
        return res.status(400).json({
            message : "All field required",
        });
    }
    
    try{
          const user = await User.findOne({email : email}).select("+password");
        
      if(!user){
          return res.status(401).json({
             message : "User not Exists",
         });
        }

     const isMatch = await bcrypt.compare(password, user.password);
        
     if(isMatch){
         return res.status(200).json({
             message : "Login successFully",
         });
        }
        else{
            return res.status(401).json({
                message : "Invalid password",
            });
        }
    }catch(err){
        console.log("Login Error : ", err.message);
        return res.status(err.status || 500).json({
            message : "Internal server Error"
        });
    }
    
});


//kahi tanka nhi bhira to ye dikha do (Middleware)
app.use("/", (req, res, next)=>{
    res.status(404).json({
        message : "404 Not Found"
    });
    next();
});

// always listening on its port
app.listen(process.env.PORT, (req, res)=>{
    console.log(`App is listening on port : ${process.env.PORT}`);
});