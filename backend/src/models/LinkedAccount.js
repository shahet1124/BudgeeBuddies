// models/LinkedAccount.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const LinkedAccount = sequelize.define('LinkedAccount', {
  account_id: {
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
  account_name: {
    type: DataTypes.STRING(100)
  },
  account_number: {
    type: DataTypes.STRING(50)
  },
  bank_name: {
    type: DataTypes.STRING(100)
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  last_sync_at: {
    type: DataTypes.DATE
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'linked_accounts',
  timestamps: false
});

// Define association
User.hasMany(LinkedAccount, { foreignKey: 'user_id' });
LinkedAccount.belongsTo(User, { foreignKey: 'user_id' });

module.exports = LinkedAccount;

