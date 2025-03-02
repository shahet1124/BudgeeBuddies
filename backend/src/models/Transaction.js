// models/Transaction.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const BudgetCategory = require('./BudgetCategory');

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
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
    references: {
      model: BudgetCategory,
      key: 'category_id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100)
  },
  notes: {
    type: DataTypes.TEXT
  },
  transaction_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  transaction_time: {
    type: DataTypes.TIME,
    allowNull: false
  },
  payment_type: {
    type: DataTypes.STRING(20),
    validate: {
      isIn: [['cash', 'online']]
    }
  },
  is_categorized: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  source: {
    type: DataTypes.STRING(50),
    defaultValue: 'manual'
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
  tableName: 'transactions',
  timestamps: false,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['category_id']
    },
    {
      fields: ['transaction_date']
    }
  ]
});

// Define associations
User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

BudgetCategory.hasMany(Transaction, { foreignKey: 'category_id' });
Transaction.belongsTo(BudgetCategory, { foreignKey: 'category_id' });

module.exports = Transaction;
