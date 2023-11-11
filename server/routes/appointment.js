const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authentication");
const Appointment = require("../models/appointment");

// Get all appointments (protected route)
router.get("/", authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new appointment (protected route)
router.post("/create", authenticateToken, async (req, res) => {
  try {
    const { name, age, title, date, description } = req.body;

    // Create a new appointment
    const newAppointment = new Appointment({
      name,
      age,
      title,
      description,
      date,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete/:id", authenticateToken, async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const existingAppointment = await Appointment.findById(appointmentId);
    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(appointmentId);

    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
