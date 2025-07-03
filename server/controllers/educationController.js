const Education = require("../models/Education");

exports.getAllEducations = async (req, res) => {
  try {
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: "Education not found" });
    res.json(education);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEducation = async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEducation) return res.status(404).json({ message: "Education not found" });
    res.json(updatedEducation);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) return res.status(404).json({ message: "Education not found" });
    res.json({ message: "Education deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllEducations = async (req, res) => {
  try {
    await Education.deleteMany();
    res.json({ message: "All educations deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
