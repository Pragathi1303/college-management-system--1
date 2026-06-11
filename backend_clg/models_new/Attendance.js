const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Please provide student reference'],
    },
    registerNumber: {
      type: String,
      required: [true, 'Please provide register number'],
      trim: true,
    },
    studentName: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide date'],
    },
    status: {
      type: String,
      enum: ['Present', 'Absent'],
      required: [true, 'Please provide attendance status'],
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate attendance for same student on same day
AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);