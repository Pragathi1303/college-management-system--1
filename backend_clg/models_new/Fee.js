const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: [true, 'Please provide student reference'],
    },
    studentName: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
    },
    registerNumber: {
      type: String,
      required: [true, 'Please provide register number'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Please provide department'],
      trim: true,
    },
    totalFee: {
      type: Number,
      required: [true, 'Please provide total fee amount'],
      min: 0,
    },
    paidAmount: {
      type: Number,
      required: [true, 'Please provide paid amount'],
      default: 0,
      min: 0,
    },
    remainingAmount: {
      type: Number,
      default: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Pending', 'Partial'],
      default: 'Pending',
    },
    dueDate: {
      type: Date,
    },
    paymentDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Calculate remaining amount before saving
FeeSchema.pre('save', function (next) {
  this.remainingAmount = this.totalFee - this.paidAmount;
  if (this.remainingAmount <= 0) {
    this.paymentStatus = 'Paid';
  } else if (this.paidAmount > 0 && this.remainingAmount > 0) {
    this.paymentStatus = 'Partial';
  } else {
    this.paymentStatus = 'Pending';
  }
  next();
});

module.exports = mongoose.model('Fee', FeeSchema);