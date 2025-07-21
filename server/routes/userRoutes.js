const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateJWT, isAdmin } = require('../middleware/auth');

// Example protected route (just for testing JWT auth)
router.get("/me", authenticateJWT, async (req, res) => {
  res.json({ message: "Protected route accessed!", user: req.user });
});

// Public user routes (you can add protection as needed)
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.delete("/", userController.deleteAllUsers);

module.exports = router;
