const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRouter = require("./routes/userRoute");
const appointmentRouter = require("./routes/appointment");

const app = express();
const PORT = process.env.port || 5000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("Connected to Database"));

app.use("/api/user", userRouter);
app.use("/api/appointments", appointmentRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
