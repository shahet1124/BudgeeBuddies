// models/KycDocument.js
module.exports = (sequelize, DataTypes) => {
    const KycDocument = sequelize.define('KycDocument', {
      document_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      document_type: {
        type: DataTypes.STRING(20),
        validate: {
          isIn: [['identity', 'address', 'selfie']]
        }
      },
      document_name: {
        type: DataTypes.STRING(50)
      },
      document_path: {
        type: DataTypes.TEXT
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    }, {
      tableName: 'kyc_documents',
      timestamps: false
    });
  
    return KycDocument;
  };