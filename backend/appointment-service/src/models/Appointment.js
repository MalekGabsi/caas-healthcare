const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, index: true },
    dateTime: { type: Date, required: true, index: true },
    reason: { type: String, required: true, trim: true, maxlength: 200 },
    status: { type: String, enum: ["scheduled", "cancelled"], default: "scheduled", index: true },
  },
  { timestamps: true }
);

// Avoid exact duplicates: same patient + same dateTime
AppointmentSchema.index({ patientId: 1, dateTime: 1 }, { unique: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);
