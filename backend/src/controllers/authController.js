// controllers/authController.js
const jwt = require('jsonwebtoken');
const { User, UserSecurity } = require('../models');
const { comparePassword } = require('../utils/passwordUtils');

// Login with mobile and password
const login = async (req, res) => {
  try {
    const { mobile_number, password } = req.body;
    
    if (!mobile_number || !password) {
      return res.status(400).json({
        success: false,
        message: 'Mobile number and password are required'
      });
    }
    
    const user = await User.findOne({
      where: { mobile_number }
    });
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    const isPasswordValid = await comparePassword(password, user.password_hash);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Fetch user security settings
    const securitySettings = await UserSecurity.findOne({
      where: { user_id: user.user_id }
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '30d' }
    );
    
    // Return user data and token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user_id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        mobile_number: user.mobile_number,
        settings: {
          push_notifications_enabled: securitySettings?.push_notifications_enabled ?? true,
          dark_mode_enabled: securitySettings?.dark_mode_enabled ?? false,
          fingerprint_enabled: securitySettings?.fingerprint_enabled ?? false
        }
      },
      token
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login'
    });
  }
};

module.exports = {
  login
};
