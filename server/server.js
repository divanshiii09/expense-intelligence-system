require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserData = require("./models/UserData");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ LOCAL MongoDB Compass connection
mongoose.connect("mongodb://127.0.0.1:27017/financeDB")
  .then(() => console.log("MongoDB LOCAL connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

// Save user data
app.post("/api/userdata/save", async (req, res) => {
  try {
    const newData = new UserData(req.body);
    await newData.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));