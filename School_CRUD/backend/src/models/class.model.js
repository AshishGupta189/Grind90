const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  className: { type: String, required: true }, 
  section: { type: String, required: true },   
  subjects: [{ type: String }] 
},{timestamps:true});

const classModel = mongoose.model("class", classSchema);

module.exports = classModel;