// Models/User.js
const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'model'], 
    required: true 
  },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}, { _id: false });


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
  // Chat History
  messages: [MessageSchema]
});

module.exports = mongoose.model('User', UserSchema);