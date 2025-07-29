const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String } 
});

module.exports = mongoose.model("Project", projectSchema);
