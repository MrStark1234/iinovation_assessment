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
    const { title, date } = req.body;

    // Create a new appointment
    const newAppointment = new Appointment({
      title,
      date,
    });

    await newAppointment.save();

    res.status(201).json({ message: "Appointment created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
