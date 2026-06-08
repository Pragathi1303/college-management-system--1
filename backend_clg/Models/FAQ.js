const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema(
  {
    q: {
      type: String,
      required: [true, 'Please provide a question'],
      trim: true,
    },
    a: {
      type: String,
      required: [true, 'Please provide an answer'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('FAQ', FAQSchema);