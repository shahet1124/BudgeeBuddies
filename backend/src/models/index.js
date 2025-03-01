// // models/index.js - Add to your existing file
// const Sequelize = require('sequelize');
// const config = require('../config/database');

// const sequelize = new Sequelize(config.database, config.username, config.password, config);

// const db = {};

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // Add your existing models
// db.User = require('./User')(sequelize, Sequelize);
// db.UserSecurity = require('./UserSecurity')(sequelize, Sequelize);
// db.FamilyMember = require('./FamilyMember')(sequelize, Sequelize);
// db.BudgetCategory = require('./BudgetCategory')(sequelize, Sequelize);
// db.BudgetAllocation = require('./BudgetAllocation')(sequelize, Sequelize);
// db.Transaction = require('./Transaction')(sequelize, Sequelize);
// db.LinkedAccount = require('./LinkedAccount')(sequelize, Sequelize);

// // Add the new models
// db.DemoWallet = require('./DemoWallet')(sequelize, Sequelize);
// db.WalletTransaction = require('./WalletTransaction')(sequelize, Sequelize);
// db.KycDocument = require('./KycDocument')(sequelize, Sequelize);

// // Define wallet-related associations
// db.User.hasOne(db.DemoWallet, { foreignKey: 'user_id' });
// db.DemoWallet.belongsTo(db.User, { foreignKey: 'user_id' });

// db.User.hasMany(db.KycDocument, { foreignKey: 'user_id' });
// db.KycDocument.belongsTo(db.User, { foreignKey: 'user_id' });

// db.DemoWallet.hasMany(db.WalletTransaction, {
//   foreignKey: 'sender_wallet_id',
//   as: 'outgoingTransactions'
// });

// db.DemoWallet.hasMany(db.WalletTransaction, {
//   foreignKey: 'receiver_wallet_id',
//   as: 'incomingTransactions'
// });

// db.WalletTransaction.belongsTo(db.DemoWallet, {
//   foreignKey: 'sender_wallet_id',
//   as: 'sender'
// });

// db.WalletTransaction.belongsTo(db.DemoWallet, {
//   foreignKey: 'receiver_wallet_id',
//   as: 'receiver'
// });

// module.exports = db;

// models/index.js
// models/index.js
const User = require('./User');
const FamilyMember = require('./FamilyMember');
const UserSecurity = require('./UserSecurity');
const BudgetCategory = require('./BudgetCategory');
const BudgetAllocation = require('./BudgetAllocation');
const Transaction = require('./Transaction');
const LinkedAccount = require('./LinkedAccount');

// Add new models
const DemoWallet = require('./DemoWallet');
const WalletTransaction = require('./WalletTransaction');
const KycDocument = require('./KycDocument');

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
