
// controllers/transactionController.js
const { Transaction, BudgetCategory } = require('../models');

exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      startDate, 
      endDate, 
      categoryId, 
      limit = 25, 
      offset = 0,
      sortBy = 'transactionDate',
      sortOrder = 'DESC'
    } = req.query;
    
    // Build where clause
    const whereClause = { userId };
    
    if (startDate && endDate) {
      whereClause.transactionDate = {
        [sequelize.Op.between]: [new Date(startDate), new Date(endDate)]
      };
    } else if (startDate) {
      whereClause.transactionDate = {
        [sequelize.Op.gte]: new Date(startDate)
      };
    } else if (endDate) {
      whereClause.transactionDate = {
        [sequelize.Op.lte]: new Date(endDate)
      };
    }
    
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    
    // Get transactions
    const transactions = await Transaction.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: BudgetCategory,
          attributes: ['categoryId', 'categoryName', 'isExpense']
        }
      ],
      order: [[sortBy, sortOrder]],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    
    res.status(200).json({
      success: true,
      data: {
        count: transactions.count,
        transactions: transactions.rows
      }
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching transactions',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const userId = req.user.id;
    const { 
      amount, 
      title, 
      notes, 
      transactionDate, 
      transactionTime,
      paymentType,
      categoryId,
      source = 'manual'
    } = req.body;
    
    // Validate if category exists and belongs to user
    if (categoryId) {
      const category = await BudgetCategory.findOne({
        where: {
          categoryId,
          userId
        }
      });
      
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Invalid category'
        });
      }
    }
    
    // Create transaction
    const newTransaction = await Transaction.create({
      userId,
      categoryId,
      amount,
      title,
      notes,
      transactionDate,
      transactionTime,
      paymentType,
      isCategorized: !!categoryId,
      source
    });
    
    res.status(201).json({
      success: true,
      message: 'Transaction added successfully',
      data: newTransaction
    });
  } catch (error) {
    console.error('Add transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding transaction',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.updateTransactionCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { transactionId } = req.params;
    const { categoryId } = req.body;
    
    // Validate if category exists and belongs to user
    const category = await BudgetCategory.findOne({
      where: {
        categoryId,
        userId
      }
    });
    
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category'
      });
    }
    
    // Find transaction
    const transaction = await Transaction.findOne({
      where: {
        transactionId,
        userId
      }
    });
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    // Update transaction
    transaction.categoryId = categoryId;
    transaction.isCategorized = true;
    await transaction.save();
    
    res.status(200).json({
      success: true,
      message: 'Transaction category updated successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Update transaction category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating transaction category',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
