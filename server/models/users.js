const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  role: { type: String, enum: ["doctor", "patient"], required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
