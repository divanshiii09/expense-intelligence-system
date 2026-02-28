const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const UserData = require("./models/UserData"); // the model

const app = express();
app.use(cors()); // allows frontend to access backend
app.use(bodyParser.json());

// Replace with your MongoDB URI (from Step 1)
const mongoURI = "mongodb://172.16.27.232:27017/financeDB";
mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error:", err));
// POST route to save user data
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

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));