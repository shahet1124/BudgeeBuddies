
const User = require('./User');
const FamilyMember = require('./FamilyMember');
const UserSecurity = require('./UserSecurity');
const BudgetCategory = require('./BudgetCategory');
const BudgetAllocation = require('./BudgetAllocation');
const Transaction = require('./Transaction');
const LinkedAccount = require('./LinkedAccount');
const sequelize = require('../config/database');

// Add new models
const DemoWallet = require('./DemoWallet');
const WalletTransaction = require('./WalletTransaction');
const KycDocument = require('./KycDocument');
sequelize.sync({ alter: true }) // Use { force: true } only if you want to drop and recreate tables
  .then(() => {
    console.log('Database synchronized successfully.');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });
module.exports = {
  User,
  FamilyMember,
  UserSecurity,
  BudgetCategory,
  BudgetAllocation,
  Transaction,
  LinkedAccount,
  DemoWallet,
  WalletTransaction,
  KycDocument
};