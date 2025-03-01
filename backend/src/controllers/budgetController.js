
// controllers/budgetController.js
const { BudgetCategory, BudgetAllocation, Transaction, sequelize } = require('../models');
const { Op } = require('sequelize');
const { User, FamilyMember } = require('../models');
const { generateBudgetRecommendations } = require('../services/budgetRecommendationService');


// Create default categories for a new user
const createDefaultCategories = async (userId) => {
  const defaultExpenseCategories = [
    'Food', 'Transport', 'Medicine', 'Groceries', 
    'Rent', 'Gifts', 'Savings', 'Entertainment'
  ];
  
  const defaultIncomeCategories = [
    'Salary', 'Business', 'Investment', 'Gifts'
  ];
  
  const expenseCategories = defaultExpenseCategories.map(name => ({
    user_id: userId,
    category_name: name,
    is_expense: true,
    is_active: true
  }));
  
  const incomeCategories = defaultIncomeCategories.map(name => ({
    user_id: userId,
    category_name: name,
    is_expense: false,
    is_active: true
  }));
  
  const allCategories = [...expenseCategories, ...incomeCategories];
  
  try {
    await BudgetCategory.bulkCreate(allCategories);
    return true;
  } catch (error) {
    console.error('Error creating default categories:', error);
    return false;
  }
};

// Get all budget categories for a user
const getCategories = async (req, res) => {
  try {
    const userId = req.user.user_id;
    
    const categories = await BudgetCategory.findAll({
      where: {
        user_id: userId,
        is_active: true
      },
      order: [
        ['is_expense', 'ASC'],
        ['category_name', 'ASC']
      ]
    });
    
    // Get current month's budget allocations
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    const allocations = await BudgetAllocation.findAll({
      where: {
        user_id: userId,
        start_date: { [Op.lte]: endOfMonth },
        end_date: { [Op.gte]: startOfMonth }
      },
      attributes: ['category_id', 'amount']
    });
    
    // Create a map of category_id to allocation amount
    const allocationMap = {};
    allocations.forEach(allocation => {
      allocationMap[allocation.category_id] = parseFloat(allocation.amount);
    });
    
    // Get total spent per category for current month
    const transactions = await Transaction.findAll({
      where: {
        user_id: userId,
        transaction_date: {
          [Op.between]: [startOfMonth, endOfMonth]
        },
        category_id: { [Op.ne]: null }
      },
      attributes: [
        'category_id',
        [sequelize.fn('SUM', sequelize.col('amount')), 'total_amount']
      ],
      group: ['category_id']
    });
    
    // Create a map of category_id to spent amount
    const spentMap = {};
    transactions.forEach(transaction => {
      spentMap[transaction.category_id] = parseFloat(transaction.dataValues.total_amount);
    });
    
    // Combine the data
    const result = categories.map(category => {
      const allocated = allocationMap[category.category_id] || 0;
      const spent = spentMap[category.category_id] || 0;
      
      return {
        category_id: category.category_id,
        category_name: category.category_name,
        is_expense: category.is_expense,
        allocated_amount: allocated,
        spent_amount: category.is_expense ? Math.abs(spent) : spent,
        remaining_amount: allocated - (category.is_expense ? Math.abs(spent) : 0)
      };
    });
    
    // Group categories by type
    const expenseCategories = result.filter(cat => cat.is_expense);
    const incomeCategories = result.filter(cat => !cat.is_expense);
    
    res.status(200).json({
      success: true,
      data: {
        expense_categories: expenseCategories,
        income_categories: incomeCategories
      }
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
};

// Create a new budget category
const createCategory = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { category_name, is_expense = true } = req.body;
    
    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required'
      });
    }
    
    // Check if category already exists
    const existingCategory = await BudgetCategory.findOne({
      where: {
        user_id: userId,
        category_name: { [Op.iLike]: category_name },
        is_active: true
      }
    });
    
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: 'Category already exists'
      });
    }
    
    // Create new category
    const newCategory = await BudgetCategory.create({
      user_id: userId,
      category_name,
      is_expense,
      is_active: true
    });
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: {
        category_id: newCategory.category_id,
        category_name: newCategory.category_name,
        is_expense: newCategory.is_expense
      }
    });
    
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category'
    });
  }
};

// Update budget allocation for a category
const updateBudgetAllocation = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const categoryId = req.params.categoryId;
    const { amount } = req.body;
    
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid amount is required'
      });
    }
    
    // Check if category exists and belongs to user
    const category = await BudgetCategory.findOne({
      where: {
        category_id: categoryId,
        user_id: userId,
        is_active: true
      }
    });
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Get current month's date range
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Check if allocation exists for this month
    let allocation = await BudgetAllocation.findOne({
      where: {
        user_id: userId,
        category_id: categoryId,
        start_date: { [Op.lte]: endOfMonth },
        end_date: { [Op.gte]: startOfMonth }
      }
    });
    
    if (allocation) {
      // Update existing allocation
      await allocation.update({
        amount: parseFloat(amount),
        updated_at: new Date()
      });
    } else {
      // Create new allocation
      allocation = await BudgetAllocation.create({
        user_id: userId,
        category_id: categoryId,
        amount: parseFloat(amount),
        start_date: startOfMonth,
        end_date: endOfMonth
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Budget allocation updated successfully',
      data: {
        category_id: parseInt(categoryId),
        amount: parseFloat(amount),
        start_date: startOfMonth,
        end_date: endOfMonth
      }
    });
    
  } catch (error) {
    console.error('Error updating budget allocation:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating budget allocation'
    });
  }
};

// Get dashboard data for budgeting module
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.user_id;
    
    // Get current month's date range
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Get total budget allocations for current month
    const totalBudget = await BudgetAllocation.sum('amount', {
      where: {
        user_id: userId,
        start_date: { [Op.lte]: endOfMonth },
        end_date: { [Op.gte]: startOfMonth }
      }
    }) || 0;
    
    // Get total expenses for current month
    const totalExpenses = await Transaction.sum('amount', {
      where: {
        user_id: userId,
        transaction_date: {
          [Op.between]: [startOfMonth, endOfMonth]
        },
        amount: { [Op.lt]: 0 }
      }
    }) || 0;
    
    // Get uncategorized transactions
    const uncategorizedTransactions = await Transaction.findAll({
      where: {
        user_id: userId,
        is_categorized: false,
        transaction_date: {
          [Op.between]: [startOfMonth, endOfMonth]
        }
      },
      order: [['transaction_date', 'DESC'], ['transaction_time', 'DESC']],
      limit: 20
    });
    
    // Format the uncategorized transactions
    const formattedTransactions = uncategorizedTransactions.map(transaction => {
      const date = new Date(transaction.transaction_date);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
      
      // Format time (assuming transaction_time is stored as HH:MM:SS)
      const timeParts = transaction.transaction_time.split(':');
      const formattedTime = `${timeParts[0]}:${timeParts[1]}`;
      
      return {
        transaction_id: transaction.transaction_id,
        type: transaction.amount > 0 ? 'Income' : 'Expense',
        amount: Math.abs(transaction.amount),
        title: transaction.title || 'Transaction',
        date_formatted: formattedDate,
        full_date: transaction.transaction_date,
        time_formatted: formattedTime,
        source: transaction.source,
        notes: transaction.notes
      };
    });
    
    // Get list of categories for dropdown
    const categories = await BudgetCategory.findAll({
      where: {
        user_id: userId,
        is_active: true
      },
      attributes: ['category_id', 'category_name', 'is_expense']
    });
    
    // Group categories
    const expenseCategories = categories
      .filter(cat => cat.is_expense)
      .map(cat => ({
        category_id: cat.category_id,
        category_name: cat.category_name
      }));
      
    const incomeCategories = categories
      .filter(cat => !cat.is_expense)
      .map(cat => ({
        category_id: cat.category_id,
        category_name: cat.category_name
      }));
    
    res.status(200).json({
      success: true,
      data: {
        budget_summary: {
          total_budget: parseFloat(totalBudget),
          total_expense: parseFloat(totalExpenses),
          progress_percentage: totalBudget > 0 ? Math.round((Math.abs(totalExpenses) / totalBudget) * 100) : 0
        },
        uncategorized_transactions: formattedTransactions,
        categories: {
          expense: expenseCategories,
          income: incomeCategories
        }
      }
    });
    
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
};


// Initialize budget with AI recommendations
const initializeBudget = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.user_id;
    const { monthly_income } = req.body;
    
    if (!monthly_income || isNaN(parseFloat(monthly_income)) || parseFloat(monthly_income) <= 0) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        message: 'Valid monthly income is required'
      });
    }
    
    // Get user data
    const user = await User.findByPk(userId, {
      transaction
    });
    
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Get family members
    const familyMembers = await FamilyMember.findAll({
      where: { user_id: userId },
      transaction
    });
    
    // Generate budget recommendations
    const budgetRecommendations = await generateBudgetRecommendations(
      user,
      familyMembers,
      parseFloat(monthly_income)
    );
    
    // Create budget categories and allocations
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Create categories and their allocations
    const categoryPromises = Object.entries(budgetRecommendations).map(async ([categoryName, amount]) => {
      // Create or find category
      let category = await BudgetCategory.findOne({
        where: {
          user_id: userId,
          category_name: categoryName,
          is_active: true
        },
        transaction
      });
      
      if (!category) {
        category = await BudgetCategory.create({
          user_id: userId,
          category_name: categoryName,
          is_expense: true,
          is_active: true
        }, { transaction });
      }
      
      // Create budget allocation
      await BudgetAllocation.create({
        user_id: userId,
        category_id: category.category_id,
        amount: amount,
        start_date: startOfMonth,
        end_date: endOfMonth
      }, { transaction });
      
      return {
        category_id: category.category_id,
        category_name: category.category_name,
        allocated_amount: amount
      };
    });
    
    const categories = await Promise.all(categoryPromises);
    
    // Also create a default income category
    const incomeCategory = await BudgetCategory.findOne({
      where: {
        user_id: userId,
        category_name: 'Salary',
        is_expense: false
      },
      transaction
    }) || await BudgetCategory.create({
      user_id: userId,
      category_name: 'Salary',
      is_expense: false,
      is_active: true
    }, { transaction });
    
    await transaction.commit();
    
    res.status(200).json({
      success: true,
      message: 'Budget initialized successfully',
      data: {
        monthly_income: parseFloat(monthly_income),
        expense_categories: categories
      }
    });
    
  } catch (error) {
    await transaction.rollback();
    console.error('Budget initialization error:', error);
    
    res.status(500).json({
      success: false,
      message: 'An error occurred during budget initialization',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  createDefaultCategories,
  getCategories,
  createCategory,
  updateBudgetAllocation,
  getDashboardData,
  initializeBudget
};
