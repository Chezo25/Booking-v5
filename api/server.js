const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const Users = require("./models/User.jsx");
require("dotenv").config();
const app = express();

const cryptpac = bcrypt.genSaltSync(10);

//middleware functions
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
// Body parser middleware to parse incoming request body
app.use(express.json());

//database middleware
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database now"));

// Route for handling registration data
app.post("/register", async (req, res) => {
  // Get data from request body
  const { name, email, password } = req.body;

  // Do some validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Save the user to the database
    const userDoc = await Users.create({
      name,
      email: email,
      password: bcrypt.hashSync(password, cryptpac),
    });

    // Return a success message
    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    return res
      .status(422)
      .json({ message: "An error occurred while creating the user" });
  }
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
