// routes/categoryRoutes.js

const express = require('express');
const router = express.Router();
const { getAllCategories, createCategory } = require('../controllers/categoryController');

// Get all categories for a user with optional filters
router.get('/categories', getAllCategories);

// Create a new category
router.post('/categories', createCategory);

module.exports = router;
