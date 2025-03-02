const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const budgetRoutes = require('./src/routes/budgetRoutes');
const walletRoutes = require('./src/routes/walletRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');


const app = express();

// Middleware to allow all origins
app.use(cors());  // This will allow all origins, methods, and headers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/wallet', walletRoutes)
app.use('/api/category', categoryRoutes);
app.use('/api/transactions', transactionRoutes);


// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;
