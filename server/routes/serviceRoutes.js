const express = require("express");
const router = express.Router();

// Placeholder route for services
router.get("/", (req, res) => {
  res.json({ message: "Services route is working!" });
});

module.exports = router;
