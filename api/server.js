const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

app.post("/login", async (req, res) => {
  // Get data from request body
  const { email, password } = req.body;

  // Do some validation
  if (!email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      "your-secret-key",
      { expiresIn: "2h" }
    );

    // Return the token and a success message
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while logging in" });
  }
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
