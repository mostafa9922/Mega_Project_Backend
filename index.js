const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/usersroutes");
require("dotenv").config();

const DB = process.env.DB;
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cors());

// enable back end to read form data that sent from front end
app.use(express.urlencoded({ extended: true }));

app.use("/api/users/", users);

// Catch-all for invalid routes
app.use((req, res) => {
  return res.status(404).json({
    status: 404,
    data: { data: null, message: "Invalid route" },
  });
});

// Start Local server

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Connect to MongoDB
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

module.exports = app;
