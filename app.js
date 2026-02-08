const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/Auth.js');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors());   // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
// Basic Route
app.use('/api/users', userRoutes);


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is breathing on port ${PORT}`);
});

