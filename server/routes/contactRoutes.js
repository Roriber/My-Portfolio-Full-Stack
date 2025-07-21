const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { authenticateJWT, isAdmin } = require("../middleware/auth");

router.post("/", contactController.createContact);

router.get("/", authenticateJWT, isAdmin, contactController.getAllContacts);
router.get("/:id", authenticateJWT, isAdmin, contactController.getContactById);
router.put("/:id", authenticateJWT, isAdmin, contactController.updateContact);
router.delete("/:id", authenticateJWT, isAdmin, contactController.deleteContact);
router.delete("/", authenticateJWT, isAdmin, contactController.deleteAllContacts);

module.exports = router;
