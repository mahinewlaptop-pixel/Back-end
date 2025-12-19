const router= require("express").Router();
const {getEdu, deleteEdu, setEdu, updateEdu} = require("../controller/eduController.js");

// Padhai likhai Add (C)
router.post("/", setEdu);

// padhai likhai read (R)
router.get("/", getEdu);

// Update some details in education (U)
router.patch("/edu/:id", updateEdu);

//Delete some education details (D)
router.delete("/:id", deleteEdu);

module.exports = router;