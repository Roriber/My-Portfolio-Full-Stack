const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true }
});

module.exports = mongoose.model("Project", projectSchema);
