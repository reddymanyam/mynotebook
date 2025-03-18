const express = require("express");
const connectDB = require('./config/db'); // Ensure this file exports connectDB correctly
const dotenv = require("dotenv");
const User = require('./models/User');
const cors = require('cors'); // Add this import

dotenv.config(); // Load environment variables

const app = express();

app.use(cors());
app.use(express.json()); // ✅ Fix: Add missing parentheses

// ✅ GET all notes
app.get('/users', async (req, res) => {
    try {
        const notes = await User.find({});
        res.status(200).json(notes);
    } catch (err) {
        res.status(400).json({ error: "Something went wrong" });
    }
});

// ✅ POST (Create new note)
app.post('/users', async (req, res) => {
    try {
        const note = new User(req.body);
        await note.save();
        console.log("Data saved successfully:", note);
        res.status(201).json({ message: "Data saved successfully", data: note });
    } catch (err) {
        res.status(400).json({ error: "Something went wrong" });
    }
});

// ✅ PATCH (Update note)
app.patch('/users/:id', async (req, res) => {
    try {
        const note = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!note) return res.status(404).json({ error: "Note not found" });

        res.status(200).json({ message: "Note updated successfully", data: note });
    } catch (err) {
        res.status(400).json({ error: "Something went wrong...!" });
    }
});

// ✅ DELETE (Delete note)
app.delete('/users/:id', async (req, res) => {
    try {
        const note = await User.findByIdAndDelete(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" });

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: "Something went wrong...!" });
    }
});

const PORT = process.env.PORT || 7777;

// ✅ Database connection and server start
connectDB()
    .then(() => {
        console.log("Database connection established..!");
        app.listen(PORT, () => {
            console.log(`Server is running at port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection is not established:", err);
    });
