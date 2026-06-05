const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name:           { type: String, required: true },
    email:          { type: String, required: true },
    phone:          { type: String, required: true },
    dob:            { type: String },
    course:         { type: String, required: true },
    previousCollege:{ type: String },
    percentage:     { type: String },
    city:           { type: String },
    message:        { type: String },
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
