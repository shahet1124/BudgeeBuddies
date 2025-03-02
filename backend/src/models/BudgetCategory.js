// models/BudgetCategory.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const BudgetCategory = sequelize.define('BudgetCategory', {
  category_id: {
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
  category_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  is_expense: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
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
  tableName: 'budget_categories',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'category_name']
    }
  ]
});

// Define association
User.hasMany(BudgetCategory, { foreignKey: 'user_id' });
BudgetCategory.belongsTo(User, { foreignKey: 'user_id' });

module.exports = BudgetCategory;

