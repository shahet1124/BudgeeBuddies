// models/DemoWallet.js
module.exports = (sequelize, DataTypes) => {
    const DemoWallet = sequelize.define('DemoWallet', {
      wallet_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      wallet_balance: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0.00
      },
      wallet_id_name: {
        type: DataTypes.STRING(50),
        unique: true
      },
      is_verified: {
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
      tableName: 'demo_wallets',
      timestamps: false
    });
  
    return DemoWallet;
  };