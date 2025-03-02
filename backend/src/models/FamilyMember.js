// models/FamilyMember.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const FamilyMember = sequelize.define('FamilyMember', {
  member_id: {
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
  gender: {
    type: DataTypes.STRING(10)
  },
  date_of_birth: {
    type: DataTypes.DATEONLY
  },
  relationship: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'family_members',
  timestamps: false
});

// Define association
User.hasMany(FamilyMember, { foreignKey: 'user_id' });
FamilyMember.belongsTo(User, { foreignKey: 'user_id' });

module.exports = FamilyMember;

