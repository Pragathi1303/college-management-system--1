const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: [true, 'Please provide a student ID'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: [true, 'Please provide gender'],
    },
    dob: {
      type: String,
      required: [true, 'Please provide date of birth'],
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
    year: {
      type: String,
      required: [true, 'Please provide year'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);