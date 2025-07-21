const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },   // use 'name' only!
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// FIX THIS LINE:
module.exports = mongoose.model("Contact", contactSchema);