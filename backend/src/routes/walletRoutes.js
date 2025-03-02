const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticateUser = require('../middlewares/auth');
const walletController = require('../controllers/walletController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/kyc-documents/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// Route definitions
router.get('/check-wallet', walletController.checkWallet);
router.get('/balance', walletController.getWalletBalance);
router.get('/transactions', walletController.getTransactionHistory);
router.post('/init-wallet-registration', walletController.initWalletRegistration);
router.post('/verify-mobile', walletController.verifyMobile);
router.post('/update-profile', walletController.updateProfile);
router.post('/set-upi-id', walletController.setUpiId);
router.post(
  '/upload-kyc',
  upload.fields([{ name: 'identity' }, { name: 'address' }, { name: 'selfie' }]),
  walletController.uploadKyc
);
router.post('/finalize-wallet', walletController.finalizeWalletSetup);

module.exports = router;
