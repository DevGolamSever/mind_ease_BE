const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const userRoutes = require('./routes/Auth.js');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. SIMPLEST CORS CONFIG
// This allows all origins, methods, and headers.
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// 2. PARSE JSON (Required for POST requests)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. ROUTES
app.use('/api/users', userRoutes);

// 4. DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.error('Connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is breathing on port ${PORT}`);
});