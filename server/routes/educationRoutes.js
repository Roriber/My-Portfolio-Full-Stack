const express = require("express");
const router = express.Router();
const educationController = require("../controllers/educationController");

router.get("/", educationController.getAllEducations);
router.get("/:id", educationController.getEducationById);
router.post("/", educationController.createEducation);
router.put("/:id", educationController.updateEducation);
router.delete("/:id", educationController.deleteEducation);
router.delete("/", educationController.deleteAllEducations);

module.exports = router;