const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: [true, 'Please provide course name'],
      trim: true,
    },
    courseCode: {
      type: String,
      required: [true, 'Please provide course code'],
      unique: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: [true, 'Please provide credits'],
      min: 1,
      max: 10,
    },
    semester: {
      type: Number,
      required: [true, 'Please provide semester'],
      min: 1,
      max: 8,
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);