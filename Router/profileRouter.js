const router = require("express").Router();
const {getProfile, updateProfile, updateContact} = require("../controller/profileRouter.js");


// Profile ke liye Get
router.get("/", getProfile);

// Update Home Profile 
router.post("/:id", updateProfile);

// update Contact detail 
router.put("/contact/:id", updateContact);

module.exports = router;