// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../Models/User.js');

// 1. AUTH: Register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created!", user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password matches (Plain text for now)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success! Return user data (excluding password for safety)
    const { password: _, ...userData } = user._doc;
    res.status(200).json({ message: "Login successful", user: userData });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. SHOW DATA: Get user and their notes
// GET all notes for a specific user
router.get('/:userId/notes', async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Find the user in MongoDB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 2. Return the notes array from the user document
    // If you don't have a 'notes' field yet, return an empty array []
    res.json(user.notes || []);

  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 3. ADD DATA: Add a new note/score to a user
router.post('/:userId/notes', async (req, res) => {
  try {
    const { note, score } = req.body;
    const user = await User.findById(req.params.userId);
    
    user.notes.push({ note, score, timestamp: Date.now() });
    await user.save();
    
    res.status(200).json(user.notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;