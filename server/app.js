require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');
const { createAdminUser } = require('./controllers/authController'); // Import your createAdminUser function

// Import routes
const loanRoutes = require('./routes/loanRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to the database and ensure admin user is created on startup
connectDB().then(() => {
  createAdminUser(); // Ensure admin user is created after DB connection is established
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/loans', loanRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use(errorHandler);

// Export the app for testing
module.exports = app;
