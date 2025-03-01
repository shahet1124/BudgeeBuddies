// models/WalletTransaction.js
module.exports = (sequelize, DataTypes) => {
    const WalletTransaction = sequelize.define('WalletTransaction', {
      wallet_tx_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sender_wallet_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'demo_wallets',
          key: 'wallet_id'
        }
      },
      receiver_wallet_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'demo_wallets',
          key: 'wallet_id'
        }
      },
      amount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false
      },
      transaction_type: {
        type: DataTypes.STRING(20),
        validate: {
          isIn: [['deposit', 'withdrawal', 'transfer']]
        }
      },
      status: {
        type: DataTypes.STRING(20),
        defaultValue: 'pending',
        validate: {
          isIn: [['pending', 'completed', 'failed']]
        }
      },
      notes: DataTypes.TEXT,
      transaction_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'wallet_transactions',
      timestamps: false
    });
  
    return WalletTransaction;
  };