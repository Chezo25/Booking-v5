const express = require("express");
const cors = require("cors");
const app = express();

//middleware functions
app.use(
  cors({
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.listen(4000);
