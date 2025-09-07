const TeacherModel = require("../models/teacher.model");

// Create Teacher
const createTeacher = async (req, res) => {
  try {
    const teacher = await TeacherModel.create(req.body);
    res.status(201).json({ message: "Teacher created successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await TeacherModel.find().populate("teachingAssignments.class", "className section");
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

const getTeacherById = async (req, res) => {
  try {
    const teacher = await TeacherModel.findById(req.params.id)
      .populate("teachingAssignments.class", "className section subjects");

    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};


// Update Teacher
const updateTeacher = async (req, res) => {
  try {
    const teacher = await TeacherModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher updated", teacher });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await TeacherModel.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

module.exports = {
  createTeacher,
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher
};
