require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserData = require("./models/UserData");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection (Non-SRV for network compatibility)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));

// ✅ Save user data
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

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));