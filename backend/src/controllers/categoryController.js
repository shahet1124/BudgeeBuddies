
// controllers/categoryController.js
const { BudgetCategory, BudgetAllocation } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const { isExpense, isActive = true } = req.query;
    
    // Build where clause
    const whereClause = { userId };
    
    if (isExpense !== undefined) {
      whereClause.isExpense = isExpense === 'true';
    }
    
    if (isActive !== undefined) {
      whereClause.isActive = isActive === 'true';
    }
    
    // Get categories
    const categories = await BudgetCategory.findAll({
      where: whereClause,
      order: [['categoryName', 'ASC']]
    });
    
    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryName, isExpense = true } = req.body;
    
    // Check if category already exists
    const existingCategory = await BudgetCategory.findOne({
      where: {
        userId,
        categoryName
      }
    });
    
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists'
      });
    }
    
    // Create category
    const newCategory = await BudgetCategory.create({
      userId,
      categoryName,
      isExpense,
      isActive: true
    });
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: newCategory
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }}