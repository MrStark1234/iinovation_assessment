const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("../models/users");
const authenticateToken = require("../middleware/authentication");

const router = express.Router();

router.use(cors());

// User registration
router.post("/register", async (req, res) => {
  try {
    const { username, password, gender, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      gender,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.Seckey
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/fetchuser", authenticateToken, async (req, res) => {
  try {
    const { role } = req.query;

    // If a specific role is provided, filter by that role
    const filter = role ? { role } : {};

    // Fetch user details based on the filter
    const users = await User.find(filter);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Example of a protected route (requires authentication)
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Profile accessed successfully" });
});

module.exports = router;
