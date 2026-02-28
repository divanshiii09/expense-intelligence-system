const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const User = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// 🔹 Register
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.json({ message: "Registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Error registering user" });
    }
});

// 🔹 Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        res.json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});