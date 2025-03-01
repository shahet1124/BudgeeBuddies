// services/otpService.js
const crypto = require('crypto');

// In-memory OTP storage (in production, use Redis or another persistent store)
const otpStore = new Map();

const generateOTP = (mobileNumber) => {
  // Generate a 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  // Store the OTP with expiration time (10 minutes)
  otpStore.set(mobileNumber, {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000
  });
  
  // In a real application, you would send this via SMS
  console.log(`OTP for ${mobileNumber}: ${otp}`);
  
  return otp;
};

const verifyOTP = (mobileNumber, providedOTP) => {
  const otpData = otpStore.get(mobileNumber);
  
  if (!otpData) {
    return { valid: false, message: 'No OTP generated for this number' };
  }
  
  if (Date.now() > otpData.expiresAt) {
    otpStore.delete(mobileNumber);
    return { valid: false, message: 'OTP has expired' };
  }
  
  if (otpData.otp !== providedOTP) {
    return { valid: false, message: 'Invalid OTP' };
  }
  
  // OTP is valid, remove it after use
  otpStore.delete(mobileNumber);
  return { valid: true };
};

module.exports = {
  generateOTP,
  verifyOTP
};