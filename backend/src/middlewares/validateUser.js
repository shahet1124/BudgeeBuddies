const validateUserRegistration = (req, res, next) => {
    const { full_name, email, mobile_number, password, date_of_birth } = req.body;
    
    // Basic validation
    if (!full_name || !mobile_number || !password || !date_of_birth) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: full name, mobile number, password, and date of birth are required' 
      });
    }
    
    // Email validation if provided
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }
    
    // Mobile validation
    if (!/^\d{10,15}$/.test(mobile_number.replace(/[\s-+]/g, ''))) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mobile number should be between 10-15 digits' 
      });
    }
    
    // Password strength validation
    if (password.length < 8) {
      return res.status(400).json({ 
        success: false, 
        message: 'Password must be at least 8 characters long' 
      });
    }
    
    // Date validation
    const birthDate = new Date(date_of_birth);
    const today = new Date();
    if (isNaN(birthDate.getTime()) || birthDate >= today) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid date of birth' 
      });
    }
    
    next();
  };
  
  module.exports = {
    validateUserRegistration
  };
  