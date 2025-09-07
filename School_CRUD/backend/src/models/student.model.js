const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  fullName: {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
  },
  phone: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  dateOfBirth: Date,
  rollNumber: { type: Number, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "class", required: true }
},{timestamps:true});

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
