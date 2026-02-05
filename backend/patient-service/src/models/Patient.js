const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 60 },
    lastName: { type: String, required: true, trim: true, maxlength: 60 },
    birthDate: { type: Date },
    phone: { type: String, trim: true, maxlength: 30 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);
