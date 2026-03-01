const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose
  .connect("mongodb://localhost:27017/finsight")
  .then(async () => {
    const hashedPassword = await bcrypt.hash("123456", 10);
    await User.create({ name: "Test User", email: "test@example.com", password: hashedPassword });
    console.log("Test user created");
    mongoose.disconnect();
  })
  .catch((err) => console.error(err));