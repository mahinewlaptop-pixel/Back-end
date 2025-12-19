const router=require("express").Router();
const { createSkill, getSkills, deleteSkill, getSkill, updateSkill } = require("../controller/skillController.js");
const Skill = require("../model/skills.js");
// yaha se skills add karenge (C)

router.post("/", createSkill);

// yaha se skill show ker lega (R)

router.get("/", getSkills);

//for delete any skill (D)
router.delete("/:id", deleteSkill);

//Get skill by skillname
router.get("/:name", getSkill);

// for update Skill info (U)
router.patch("/:id", updateSkill);

module.exports = router;