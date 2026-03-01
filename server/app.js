const express = require("express");
const mongoose = require("mongoose");
const userDataRouter = require("./routes/UserData"); // route file in server/routes

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Mount the route
app.use("/api/userdata", userDataRouter);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/finsight", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));