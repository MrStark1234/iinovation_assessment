const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
