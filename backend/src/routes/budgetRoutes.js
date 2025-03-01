// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');
const { authenticate } = require('../middlewares/auth');

// Apply authentication middleware to all budget routes
router.use(authenticate);

// Get all budget categories
router.get('/categories', budgetController.getCategories);

// Create a new budget category
router.post('/categories', budgetController.createCategory);

// Update budget allocation for a category
router.put('/allocations/:categoryId', budgetController.updateBudgetAllocation);

// Get budget dashboard data
router.get('/dashboard', budgetController.getDashboardData);

// Initialize budget with AI recommendations
router.post('/initialize', budgetController.initializeBudget);

//Add an expense
router.post('/add-expense',)

module.exports = router;