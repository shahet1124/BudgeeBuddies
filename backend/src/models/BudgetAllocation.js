// models/BudgetAllocation.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const BudgetCategory = require('./BudgetCategory');

const BudgetAllocation = sequelize.define('BudgetAllocation', {
  allocation_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: BudgetCategory,
      key: 'category_id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'budget_allocations',
  timestamps: false
});

// Define associations
User.hasMany(BudgetAllocation, { foreignKey: 'user_id' });
BudgetAllocation.belongsTo(User, { foreignKey: 'user_id' });

BudgetCategory.hasMany(BudgetAllocation, { foreignKey: 'category_id' });
BudgetAllocation.belongsTo(BudgetCategory, { foreignKey: 'category_id' });

module.exports = BudgetAllocation;