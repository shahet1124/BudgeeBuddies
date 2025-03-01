const express = require('express');
const walletController = require('../controllers/walletController');

const router = express.Router();

// Send OTP for wallet registration
router.post('/send-otp', walletController.sendOTP);

// Verify OTP
router.post('/verify-otp', walletController.verifyOTP);

// Save personal information
router.post('/save-personal-info', walletController.savePersonalInfo);

// Create wallet ID
router.post('/create-wallet-id', walletController.createWalletId);

// Set wallet PIN
router.post('/set-wallet-pin', walletController.setWalletPin);

// Get wallet details
router.get('/get-wallet-details', walletController.getWalletDetails);

// Transfer money
router.post('/transfer-money', walletController.transferMoney);

// Top up wallet
router.post('/top-up-wallet', walletController.topUpWallet);

// Withdraw money
router.post('/withdraw-money', walletController.withdrawMoney);

// Get transaction history
router.get('/transaction-history', walletController.getTransactionHistory);

module.exports = router;
