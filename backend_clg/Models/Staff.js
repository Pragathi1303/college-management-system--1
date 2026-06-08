const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema(
  {
    staffId: {
      type: String,
      required: [true, 'Please provide a staff ID'],
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Please provide designation'],
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

module.exports = mongoose.model('Staff', StaffSchema);