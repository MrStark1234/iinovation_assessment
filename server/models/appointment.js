const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;
