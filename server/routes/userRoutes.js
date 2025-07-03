const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../../middleware/auth");

router.get("/me", authenticateToken, async (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.delete("/", userController.deleteAllUsers);


module.exports = router;
