// controllers/walletController.js
const bcrypt = require('bcrypt');
const { sequelize, User, DemoWallet, UserSecurity, WalletTransaction } = require('../models');
const { verifyOTP, generateOTP } = require('../services/otpService');

// Send OTP for wallet registration
exports.sendOTP = async (req, res) => {
  try {
    const { mobileNumber } = req.body;
    
    if (!mobileNumber) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mobile number is required' 
      });
    }
    
    // Generate and send OTP
    const otp = generateOTP(mobileNumber);
    
    // Check if user exists
    const user = await User.findOne({ 
      where: { mobile_number: mobileNumber }
    });
    
    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      isExistingUser: !!user
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send OTP' 
    });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { mobileNumber, otp } = req.body;
    
    if (!mobileNumber || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mobile number and OTP are required' 
      });
    }
    
    // Verify OTP
    const result = verifyOTP(mobileNumber, otp);
    
    if (!result.valid) {
      return res.status(400).json({ 
        success: false, 
        message: result.message 
      });
    }
    
    // Find or create user
    let user = await User.findOne({ where: { mobile_number: mobileNumber } });
    
    return res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      userId: user ? user.user_id : null,
      hasWallet: false, // Will be updated in the next registration step
      isNewUser: !user
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to verify OTP' 
    });
  }
};

// Save personal information
exports.savePersonalInfo = async (req, res) => {
  try {
    const { fullName, gender, dateOfBirth, address, city, pincode, mobileNumber } = req.body;
    
    // Validate required fields
    if (!fullName || !gender || !dateOfBirth || !address || !city || !pincode) {
      return res.status(400).json({ 
        success: false, 
        message: 'All personal details are required' 
      });
    }
    
    // Find or create user
    let user = await User.findOne({ where: { mobile_number: mobileNumber } });
    
    if (user) {
      // Update existing user
      await User.update({
        full_name: fullName,
        gender,
        date_of_birth: dateOfBirth,
        address,
        city,
        pincode,
        updated_at: new Date()
      }, { 
        where: { user_id: user.user_id } 
      });
    } else {
      // Create new user with a temporary password
      const tempPassword = Math.random().toString(36).substring(2, 10);
      const passwordHash = await bcrypt.hash(tempPassword, 10);
      
      user = await User.create({
        full_name: fullName,
        mobile_number: mobileNumber,
        password_hash: passwordHash,
        gender,
        date_of_birth: dateOfBirth,
        address,
        city,
        pincode
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Personal information saved successfully',
      userId: user.user_id
    });
  } catch (error) {
    console.error('Error saving personal info:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to save personal information' 
    });
  }
};

// Create wallet ID
exports.createWalletId = async (req, res) => {
  try {
    const { userId, walletIdName } = req.body;
    
    if (!walletIdName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Wallet ID name is required' 
      });
    }
    
    // Format wallet ID with domain
    const formattedWalletId = `${walletIdName}@okbuddy`;
    
    // Check if wallet ID is available
    const existingWallet = await DemoWallet.findOne({
      where: { wallet_id_name: formattedWalletId }
    });
    
    if (existingWallet) {
      return res.status(400).json({ 
        success: false, 
        message: 'This wallet ID is already taken' 
      });
    }
    
    // Check if user already has a wallet
    const userWallet = await DemoWallet.findOne({
      where: { user_id: userId }
    });
    
    if (userWallet) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already has a wallet' 
      });
    }
    
    // Create new wallet
    const wallet = await DemoWallet.create({
      user_id: userId,
      wallet_id_name: formattedWalletId,
      wallet_balance: 0.00,
      is_verified: false
    });
    
    return res.status(201).json({
      success: true,
      message: 'Wallet ID created successfully',
      walletId: formattedWalletId,
      walletDbId: wallet.wallet_id
    });
  } catch (error) {
    console.error('Error creating wallet ID:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to create wallet ID' 
    });
  }
};

// Set wallet PIN
exports.setWalletPin = async (req, res) => {
  try {
    const { userId, pin } = req.body;
    
    if (!pin || pin.length !== 6 || !/^\d+$/.test(pin)) {
      return res.status(400).json({ 
        success: false, 
        message: 'PIN must be a 6-digit number' 
      });
    }
    
    // Hash the PIN
    const pinHash = await bcrypt.hash(pin, 10);
    
    // Check if user security record exists
    let userSecurity = await UserSecurity.findOne({
      where: { user_id: userId }
    });
    
    if (userSecurity) {
      // Update existing record
      await UserSecurity.update({
        security_pin: pinHash,
        updated_at: new Date()
      }, {
        where: { user_id: userId }
      });
    } else {
      // Create new security record
      await UserSecurity.create({
        user_id: userId,
        security_pin: pinHash
      });
    }
    
    // Mark wallet as verified
    await DemoWallet.update({
      is_verified: true,
      updated_at: new Date()
    }, {
      where: { user_id: userId }
    });
    
    return res.status(200).json({
      success: true,
      message: 'Wallet PIN set successfully'
    });
  } catch (error) {
    console.error('Error setting wallet PIN:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to set wallet PIN' 
    });
  }
};

// Get wallet details
exports.getWalletDetails = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming middleware sets req.user
    
    const wallet = await DemoWallet.findOne({
      where: { user_id: userId }
    });
    
    if (!wallet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }
    
    // Check if wallet is verified
    if (!wallet.is_verified) {
      return res.status(403).json({
        success: false,
        message: 'Wallet registration is incomplete',
        walletId: wallet.wallet_id_name
      });
    }
    
    return res.status(200).json({
      success: true,
      wallet: {
        walletId: wallet.wallet_id_name,
        balance: wallet.wallet_balance,
        isVerified: wallet.is_verified
      }
    });
  } catch (error) {
    console.error('Error getting wallet details:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to get wallet details' 
    });
  }
};

// Transfer money
exports.transferMoney = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { recipientIdentifier, amount, notes, pin } = req.body;
    
    if (!recipientIdentifier || !amount || !pin) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Recipient, amount and PIN are required' 
      });
    }
    
    // Validate amount
    if (amount <= 0) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Amount must be greater than zero' 
      });
    }
    
    // Verify PIN
    const userSecurity = await UserSecurity.findOne({
      where: { user_id: userId }
    });
    
    if (!userSecurity || !userSecurity.security_pin) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Security PIN not set' 
      });
    }
    
    const isPinValid = await bcrypt.compare(pin, userSecurity.security_pin);
    
    if (!isPinValid) {
      await transaction.rollback();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid PIN' 
      });
    }
    
    // Get sender's wallet
    const senderWallet = await DemoWallet.findOne({
      where: { user_id: userId },
      transaction
    });
    
    if (!senderWallet) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        message: 'Sender wallet not found' 
      });
    }
    
    // Check sufficient balance
    if (parseFloat(senderWallet.wallet_balance) < parseFloat(amount)) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient balance' 
      });
    }
    
    // Find recipient wallet
    let recipientWallet;
    
    // Check if identifier is a mobile number
    if (/^\d{10}$/.test(recipientIdentifier)) {
      const recipientUser = await User.findOne({
        where: { mobile_number: recipientIdentifier },
        transaction
      });
      
      if (recipientUser) {
        recipientWallet = await DemoWallet.findOne({
          where: { user_id: recipientUser.user_id },
          transaction
        });
      }
    } else {
      // Check if identifier is a wallet ID
      recipientWallet = await DemoWallet.findOne({
        where: { wallet_id_name: recipientIdentifier },
        transaction
      });
    }
    
    if (!recipientWallet) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        message: 'Recipient wallet not found' 
      });
    }
    
    // Check if sending to self
    if (senderWallet.wallet_id === recipientWallet.wallet_id) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot transfer to your own wallet' 
      });
    }
    
    // Update sender's balance
    await DemoWallet.update({
      wallet_balance: sequelize.literal(`wallet_balance - ${amount}`),
      updated_at: new Date()
    }, {
      where: { wallet_id: senderWallet.wallet_id },
      transaction
    });
    
    // Update recipient's balance
    await DemoWallet.update({
      wallet_balance: sequelize.literal(`wallet_balance + ${amount}`),
      updated_at: new Date()
    }, {
      where: { wallet_id: recipientWallet.wallet_id },
      transaction
    });
    
    // Create transaction record
    await WalletTransaction.create({
      sender_wallet_id: senderWallet.wallet_id,
      receiver_wallet_id: recipientWallet.wallet_id,
      amount,
      transaction_type: 'transfer',
      status: 'completed',
      notes,
      transaction_date: new Date()
    }, { transaction });
    
    // Commit transaction
    await transaction.commit();
    
    return res.status(200).json({
      success: true,
      message: 'Transfer completed successfully',
      transactionDetails: {
        amount,
        recipient: recipientWallet.wallet_id_name,
        date: new Date()
      }
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error transferring money:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to transfer money' 
    });
  }
};

// Top up wallet
exports.topUpWallet = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { amount } = req.body;
    
    if (!amount || amount <= 0) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Valid amount is required' 
      });
    }
    
    // Get user's wallet
    const wallet = await DemoWallet.findOne({
      where: { user_id: userId },
      transaction
    });
    
    if (!wallet) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }
    
    // Update wallet balance
    await DemoWallet.update({
      wallet_balance: sequelize.literal(`wallet_balance + ${amount}`),
      updated_at: new Date()
    }, {
      where: { wallet_id: wallet.wallet_id },
      transaction
    });
    
    // Create transaction record
    await WalletTransaction.create({
      receiver_wallet_id: wallet.wallet_id,
      amount,
      transaction_type: 'deposit',
      status: 'completed',
      notes: 'Wallet top-up',
      transaction_date: new Date()
    }, { transaction });
    
    // Commit transaction
    await transaction.commit();
    
    return res.status(200).json({
      success: true,
      message: 'Wallet topped up successfully',
      newBalance: parseFloat(wallet.wallet_balance) + parseFloat(amount)
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error topping up wallet:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to top up wallet' 
    });
  }
};

// Withdraw from wallet
exports.withdrawMoney = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const userId = req.user.id;
    const { amount, pin } = req.body;
    
    if (!amount || !pin) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Amount and PIN are required' 
      });
    }
    
    // Validate amount
    if (amount <= 0) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Amount must be greater than zero' 
      });
    }
    
    // Verify PIN
    const userSecurity = await UserSecurity.findOne({
      where: { user_id: userId }
    });
    
    if (!userSecurity || !userSecurity.security_pin) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Security PIN not set' 
      });
    }
    
    const isPinValid = await bcrypt.compare(pin, userSecurity.security_pin);
    
    if (!isPinValid) {
      await transaction.rollback();
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid PIN' 
      });
    }
    
    // Get user's wallet
    const wallet = await DemoWallet.findOne({
      where: { user_id: userId },
      transaction
    });
    
    if (!wallet) {
      await transaction.rollback();
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }
    
    // Check sufficient balance
    if (parseFloat(wallet.wallet_balance) < parseFloat(amount)) {
      await transaction.rollback();
      return res.status(400).json({ 
        success: false, 
        message: 'Insufficient balance' 
      });
    }
    
    // Update wallet balance
    await DemoWallet.update({
      wallet_balance: sequelize.literal(`wallet_balance - ${amount}`),
      updated_at: new Date()
    }, {
      where: { wallet_id: wallet.wallet_id },
      transaction
    });
    
    // Create transaction record
    await WalletTransaction.create({
      sender_wallet_id: wallet.wallet_id,
      amount,
      transaction_type: 'withdrawal',
      status: 'completed',
      notes: 'Wallet withdrawal',
      transaction_date: new Date()
    }, { transaction });
    
    // Commit transaction
    await transaction.commit();
    
    return res.status(200).json({
      success: true,
      message: 'Withdrawal completed successfully',
      newBalance: parseFloat(wallet.wallet_balance) - parseFloat(amount)
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error withdrawing money:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to withdraw money' 
    });
  }
};

// Get transaction history
exports.getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's wallet
    const wallet = await DemoWallet.findOne({
      where: { user_id: userId }
    });
    
    if (!wallet) {
      return res.status(404).json({ 
        success: false, 
        message: 'Wallet not found' 
      });
    }
    
    // Get all transactions involving this wallet
    const transactions = await WalletTransaction.findAll({
      where: {
        [sequelize.Op.or]: [
          { sender_wallet_id: wallet.wallet_id },
          { receiver_wallet_id: wallet.wallet_id }
        ]
      },
      order: [['transaction_date', 'DESC']],
      include: [
        {
          model: DemoWallet,
          as: 'sender',
          include: [{ model: User, attributes: ['full_name'] }]
        },
        {
          model: DemoWallet,
          as: 'receiver',
          include: [{ model: User, attributes: ['full_name'] }]
        }
      ]
    });
    
    // Format transactions
    const formattedTransactions = transactions.map(tx => {
      const isSender = tx.sender_wallet_id === wallet.wallet_id;
      const otherParty = isSender 
        ? (tx.receiver?.User?.full_name || tx.receiver?.wallet_id_name || 'Unknown') 
        : (tx.sender?.User?.full_name || tx.sender?.wallet_id_name || 'Unknown');
      
      return {
        id: tx.wallet_tx_id,
        date: tx.transaction_date,
        amount: parseFloat(tx.amount),
        type: tx.transaction_type,
        isExpense: isSender,
        otherParty,
        notes: tx.notes,
        status: tx.status
      };
    });
    
    // Calculate summary
    const income = formattedTransactions
      .filter(tx => !tx.isExpense)
      .reduce((sum, tx) => sum + tx.amount, 0);
      
    const expense = formattedTransactions
      .filter(tx => tx.isExpense)
      .reduce((sum, tx) => sum + tx.amount, 0);
    
    return res.status(200).json({
      success: true,
      balance: parseFloat(wallet.wallet_balance),
      income,
      expense,
      transactions: formattedTransactions
    });
  } catch (error) {
    console.error('Error getting transaction history:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to get transaction history' 
    });
  }
};