// models/UserSecurity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const UserSecurity = sequelize.define('UserSecurity', {
  security_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  security_pin: {
    type: DataTypes.STRING(255)
  },
  fingerprint_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  push_notifications_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  dark_mode_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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
  tableName: 'user_security',
  timestamps: false
});

// Define association
User.hasOne(UserSecurity, { foreignKey: 'user_id' });
UserSecurity.belongsTo(User, { foreignKey: 'user_id' });

module.exports = UserSecurity;

