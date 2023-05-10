const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const app = express();

//middleware functions
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
// Body parser middleware to parse incoming request body
app.use(express.json());

mongoose.connect();

// Route for handling registration data
app.post("/register", (req, res) => {
  // Get data from request body
  const { name, email, password } = req.body;

  // Do some validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Save the user to the database or do some other action
  // ...

  // Return a success message
  return res.status(200).json({ message: "Registration successful" });
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
