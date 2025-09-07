const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

router.post("/students", studentController.registerStudent);   // create
router.get("/students", studentController.getAllStudents);     // read all
router.get("/students/:id", studentController.getStudentById); // read one
router.put("/students/:id", studentController.updateStudent);  // update
router.delete("/students/:id", studentController.deleteStudent); // delete

module.exports = router;