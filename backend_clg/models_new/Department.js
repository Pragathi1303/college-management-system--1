const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema(
  {
    departmentName: {
      type: String,
      required: [true, 'Please provide department name'],
      unique: true,
      trim: true,
    },
    departmentCode: {
      type: String,
      required: [true, 'Please provide department code'],
      unique: true,
      trim: true,
    },
    hodName: {
      type: String,
      required: [true, 'Please provide HOD name'],
      trim: true,
    },
    totalStudents: {
      type: Number,
      default: 0,
    },
    totalFaculty: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Department', DepartmentSchema);