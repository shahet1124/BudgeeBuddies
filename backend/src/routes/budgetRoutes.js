// routes/budgetRoutes.js
const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// Route to get all budget categories for a user
router.get('/categories', budgetController.getCategories);

// Route to create a new budget category
router.post('/categories', budgetController.createCategory);

// Route to update budget allocation for a category
router.put('/categories/:categoryId/allocations', budgetController.updateBudgetAllocation);

// Route to get dashboard data for budgeting module
router.get('/dashboard', budgetController.getDashboardData);

module.exports = router;