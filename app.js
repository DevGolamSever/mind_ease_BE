const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies

// Basic Route
app.get('/', (req, res) => {
  res.send('MindEase API is running...');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is breathing on port ${PORT}`);
});