const classModel = require("../models/class.model");

const createClass = async (req, res) => {
  try {
    const newClass = await classModel.create(req.body);
    res
      .status(201)
      .json({ message: "Class created successfully", class: newClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllClasses = async (req, res) => {
  try {
    const classes = await classModel.find();
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getClassById = async (req, res) => {
  try {
    const classData = await classModel.findById(req.params.id);
    if (!classData) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json(classData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateClass = async (req, res) => {
  try {
    const updatedClass = await classModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res
      .status(200)
      .json({ message: "Class updated successfully", class: updatedClass });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteClass = async (req, res) => {
  try {
    const deletedClass = await classModel.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
};
