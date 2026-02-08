// Models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // For your scores/notes (Screenshot 1)
  notes: [{
    id: String,
    note: String,
    score: Number,
    timestamp: Number
  }],
  // For your chat history (Screenshot 3)

});

module.exports = mongoose.model('User', UserSchema);