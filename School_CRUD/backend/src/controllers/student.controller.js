const studentModel = require("../models/student.model");

const registerStudent = async (req, res) => {
  try {
    const student = req.body;
    const isStudentExists = await studentModel.findOne({
      rollNumber: student.rollNumber,
      class: student.class,
    });

    if (isStudentExists) {
      return res.status(401).json({
        message: "Student with this Roll Number already exists in this class!",
      });
    }

    await studentModel.create(student);
    return res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find().populate("class");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id).populate("class");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};
const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};

const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
};



module.exports = { registerStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };
