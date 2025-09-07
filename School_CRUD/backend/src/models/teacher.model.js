const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, trim: true },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true },

    teachingAssignments: [
      {
        class: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "class",
          required: true,
        },
        subject: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const teacherModel = mongoose.model("teacher", teacherSchema);
module.exports = teacherModel;
