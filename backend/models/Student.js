const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    phone:      { type: String },
    course:     { type: String },
    year:       { type: Number },
    rollNumber: { type: String, unique: true },
    status:     { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
