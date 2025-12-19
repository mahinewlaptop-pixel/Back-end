const Project = require("../model/project.js");
const router = require("express").Router();
const{getProject, setProject, updateProject, getTitle, deleteProject , updateFull} = require("../controller/projectController.js");
console.log(getProject);

// for adding new project (C)

router.post("/", setProject);

// edit full project data (U)
router.put("/:id", updateFull);

// edit few data from project (U)
router.patch("/:id", updateProject);

// yaha se sb project return krr lega (R)
 router.get("/", getProject);

// yaha se project delete ker sakte hai (D)
router.delete('/:id', deleteProject);

//get by title name
router.get("/:title", getTitle);

module.exports= router;