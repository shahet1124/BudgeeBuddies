// routes/transactionRoutes.js

const express = require('express');
const router = express.Router();
const { getAllTransactions, addTransaction, updateTransactionCategory } = require('../controllers/transactionController');

// Get all transactions for a user with optional filters
router.get('/transactions', getAllTransactions);

// Add a new transaction
router.post('/transactions', addTransaction);

// Update transaction category
router.put('/transactions/:transactionId/category', updateTransactionCategory);

module.exports = router;
