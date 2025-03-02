const { DemoWallet, WalletTransaction, User, KycDocument } = require('../models');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Check if wallet exists
const checkWallet = async (req, res) => {
  try {
    const wallet = await DemoWallet.findOne({ where: { user_id: req.user.user_id } });
    return res.json({
      hasWallet: !!wallet,
      walletData: wallet || null,
    });
  } catch (error) {
    console.error('Error checking wallet:', error);
    return res.status(500).json({ error: 'Failed to check wallet status' });
  }
};

// Get wallet balance
const getWalletBalance = async (req, res) => {
  try {
    const wallet = await DemoWallet.findOne({ where: { user_id: req.user.user_id } });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    return res.json({
      wallet_id: wallet.wallet_id,
      wallet_id_name: wallet.wallet_id_name,
      balance: wallet.wallet_balance,
      is_verified: wallet.is_verified,
    });
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return res.status(500).json({ error: 'Failed to fetch wallet balance' });
  }
};

// Get transaction history
const getTransactionHistory = async (req, res) => {
  try {
    const wallet = await DemoWallet.findOne({ where: { user_id: req.user.user_id } });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const transactions = await WalletTransaction.findAll({
      where: {
        [Op.or]: [
          { sender_wallet_id: wallet.wallet_id },
          { receiver_wallet_id: wallet.wallet_id },
        ],
      },
      order: [['transaction_date', 'DESC']],
      limit: req.query.limit ? parseInt(req.query.limit) : 20,
      offset: req.query.offset ? parseInt(req.query.offset) : 0,
    });

    // Format transactions for response
    const formattedTransactions = await Promise.all(
      transactions.map(async (tx) => {
        const isSender = tx.sender_wallet_id === wallet.wallet_id;

        // Get other party's wallet details
        const otherWalletId = isSender ? tx.receiver_wallet_id : tx.sender_wallet_id;
        let otherWallet = null;
        let otherUser = null;

        if (otherWalletId) {
          otherWallet = await DemoWallet.findByPk(otherWalletId);
          if (otherWallet) {
            otherUser = await User.findByPk(otherWallet.user_id, {
              attributes: ['full_name'],
            });
          }
        }

        return {
          transaction_id: tx.wallet_tx_id,
          date: tx.transaction_date,
          type: tx.transaction_type,
          amount: tx.amount,
          status: tx.status,
          notes: tx.notes,
          direction: isSender ? 'outgoing' : 'incoming',
          otherParty: otherUser ? otherUser.full_name : 'Unknown',
          otherWalletId: otherWallet ? otherWallet.wallet_id_name : null,
        };
      })
    );

    return res.json({
      transactions: formattedTransactions,
      total: await WalletTransaction.count({
        where: {
          [Op.or]: [
            { sender_wallet_id: wallet.wallet_id },
            { receiver_wallet_id: wallet.wallet_id },
          ],
        },
      }),
    });
  } catch (error) {
    console.error('Error fetching transaction history:', error);
    return res.status(500).json({ error: 'Failed to fetch transaction history' });
  }
};

// Wallet registration flow
const initWalletRegistration = async (req, res) => {
  try {
    const existingWallet = await DemoWallet.findOne({ where: { user_id: req.user.user_id } });

    if (existingWallet) {
      return res.status(400).json({ error: 'User already has a wallet registered' });
    }

    return res.json({ message: 'Ready to start wallet registration' });
  } catch (error) {
    console.error('Error initiating wallet registration:', error);
    return res.status(500).json({ error: 'Failed to initiate wallet registration' });
  }
};

// Verify mobile number with OTP
const verifyMobile = (req, res) => {
  const { otp } = req.body;

  // In a real system, you would validate the OTP
  if (otp !== '123456') {
    return res.status(400).json({ error: 'Invalid OTP' });
  }

  return res.json({ message: 'Mobile number verified successfully', verified: true });
};

// Update user profile details
const updateProfile = async (req, res) => {
  const { fullName, gender, dateOfBirth, address, city, pincode } = req.body;

  try {
    await User.update(
      {
        full_name: fullName,
        gender,
        date_of_birth: dateOfBirth,
        address,
        city,
        pincode,
      },
      { where: { user_id: req.user.user_id } }
    );

    return res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Set UPI ID
const setUpiId = async (req, res) => {
  const { upiId } = req.body;

  try {
    const baseUpiId = upiId.replace(/@.*$/, '');
    const walletIdName = `${baseUpiId}@okbuddy`;

    const existingWallet = await DemoWallet.findOne({
      where: { wallet_id_name: walletIdName },
    });

    if (existingWallet) {
      return res.status(400).json({ error: 'This UPI ID is already taken' });
    }

    const wallet = await DemoWallet.create({
      user_id: req.user.user_id,
      wallet_id_name: walletIdName,
      wallet_balance: 0.0,
      is_verified: false,
    });

    return res.json({
      message: 'UPI ID set successfully',
      walletIdName,
      wallet_id: wallet.wallet_id,
    });
  } catch (error) {
    console.error('Error setting UPI ID:', error);
    return res.status(500).json({ error: 'Failed to set UPI ID' });
  }
};

// Upload KYC documents
const uploadKyc = async (req, res) => {
  try {
    if (!req.files || !req.files.identity || !req.files.address || !req.files.selfie) {
      return res.status(400).json({ error: 'All required documents must be uploaded' });
    }

    const documentsToCreate = [];

    // Process each document type
    ['identity', 'address', 'selfie'].forEach((docType) => {
      const file = req.files[docType][0];
      documentsToCreate.push({
        user_id: req.user.user_id,
        document_type: docType,
        document_name: file.originalname,
        document_path: file.path,
        is_verified: false,
      });
    });

    // Bulk create document records
    await KycDocument.bulkCreate(documentsToCreate);

    return res.json({ message: 'KYC documents uploaded successfully' });
  } catch (error) {
    console.error('Error uploading KYC documents:', error);
    return res.status(500).json({ error: 'Failed to upload KYC documents' });
  }
};

// Finalize wallet setup
const finalizeWalletSetup = async (req, res) => {
  try {
    const wallet = await DemoWallet.findOne({ where: { user_id: req.user.user_id } });

    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    // Set wallet as verified
    await wallet.update({ is_verified: true });

    // For demo, also mark KYC documents as verified
    await KycDocument.update(
      { is_verified: true },
      { where: { user_id: req.user.user_id } }
    );

    // Add initial bonus amount (optional)
    await wallet.update({ wallet_balance: 100.0 }); // Welcome bonus

    // Record the bonus transaction
    await WalletTransaction.create({
      receiver_wallet_id: wallet.wallet_id,
      amount: 100.0,
      transaction_type: 'deposit',
      status: 'completed',
      notes: 'Welcome bonus',
    });

    return res.json({
      message: 'Wallet setup completed successfully',
      wallet: {
        wallet_id: wallet.wallet_id,
        wallet_id_name: wallet.wallet_id_name,
        balance: wallet.wallet_balance,
        is_verified: wallet.is_verified,
      },
    });
  } catch (error) {
    console.error('Error finalizing wallet setup:', error);
    return res.status(500).json({ error: 'Failed to finalize wallet setup' });
  }
};

module.exports = {
  getWalletBalance,
  checkWallet,
  getTransactionHistory,
  initWalletRegistration,
  verifyMobile,
  updateProfile,
  setUpiId,
  uploadKyc,
  finalizeWalletSetup,
};