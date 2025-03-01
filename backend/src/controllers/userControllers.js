// controllers/userController.js
const { User, FamilyMember, UserSecurity } = require('../models');
const { hashPassword } = require('../utils/passwordUtils');
const sequelize = require('../config/database');

// Register a new user
const registerUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const {
      full_name,
      email,
      mobile_number,
      password,
      date_of_birth,
      address,
      city,
      state,
      pincode,
      family_members,  // New field for family members
      monthly_income   // New field for monthly income
    } = req.body;

    // Step 1: Check if user with mobile number already exists
    const existingUser = await User.findOne({
      where: { mobile_number },
      transaction
    });

    if (existingUser) {
      await transaction.rollback();
      return res.status(409).json({
        success: false,
        message: 'User with this mobile number already exists'
      });
    }

    if (email) {
      const emailExists = await User.findOne({
        where: { email },
        transaction
      });

      if (emailExists) {
        await transaction.rollback();
        return res.status(409).json({
          success: false,
          message: 'User with this email already exists'
        });
      }
    }

    // Step 2: Hash the password
    const password_hash = await hashPassword(password);

    // Step 3: Create the new user
    const newUser = await User.create({
      full_name,
      email,
      mobile_number,
      password_hash,
      date_of_birth,
      address,
      city,
      state,
      pincode,
      monthly_income  // Store monthly income
    }, { transaction });

    // Step 4: Handle Family Members
    if (family_members && Array.isArray(family_members) && family_members.length > 0) {
      if (family_members.length !== family_members.length) {
        await transaction.rollback();
        return res.status(400).json({
          success: false,
          message: 'Family members data mismatch'
        });
      }

      // Map the family members to add the user_id
      const familyMemberRecords = family_members.map(member => ({
        ...member,
        user_id: newUser.user_id  // Associate with new user
      }));

      await FamilyMember.bulkCreate(familyMemberRecords, { transaction });
    }

    // Commit the transaction
    await transaction.commit();

    // Step 5: Return success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      userId: newUser.user_id
    });
  
  } catch (error) {
    await transaction.rollback();
    console.error('Registration error:', error);
    
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
// const registerUser = async (req, res) => {
//   const transaction = await sequelize.transaction();
  
//   try {
//     const {
//       full_name,
//       email,
//       mobile_number,
//       password,
//       date_of_birth,
//       address,
//       city,
//       state,
//       pincode,
//       family_members
//     } = req.body;

//     // Check if user with mobile number already exists
//     const existingUser = await User.findOne({
//       where: { mobile_number },
//       transaction
//     });

//     if (existingUser) {
//       await transaction.rollback();
//       return res.status(409).json({
//         success: false,
//         message: 'User with this mobile number already exists'
//       });
//     }

//     if (email) {
//       const emailExists = await User.findOne({
//         where: { email },
//         transaction
//       });

//       if (emailExists) {
//         await transaction.rollback();
//         return res.status(409).json({
//           success: false,
//           message: 'User with this email already exists'
//         });
//       }
//     }

//     // Hash the password
//     const password_hash = await hashPassword(password);

//     // Create new user
//     const newUser = await User.create({
//       full_name,
//       email,
//       mobile_number,
//       password_hash,
//       date_of_birth,
//       address,
//       city,
//       state,
//       pincode
//     }, { transaction });

//     // Create user security settings
//     // const securitySettings = {
//     //   user_id: newUser.user_id,
//     //   push_notifications_enabled: true,
//     //   dark_mode_enabled: false,
//     //   fingerprint_enabled: false
//     // };

//     // // Add security PIN if provided
//     // if (security_pin) {
//     //   const hashedPin = await hashPassword(security_pin);
//     //   securitySettings.security_pin = hashedPin;
//     // }

//     // await UserSecurity.create(securitySettings, { transaction });

//     // Create family members if provided
//     if (family_members && Array.isArray(family_members) && family_members.length > 0) {
//       const familyMemberRecords = family_members.map(member => ({
//         ...member,
//         user_id: newUser.user_id
//       }));

//       await FamilyMember.bulkCreate(familyMemberRecords, { transaction });
//     }

//     await transaction.commit();

//     // Return success without exposing sensitive data
//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       userId: newUser.user_id
//     });
    
//   } catch (error) {
//     await transaction.rollback();
//     console.error('Registration error:', error);
    
//     res.status(500).json({
//       success: false,
//       message: 'An error occurred during registration',
//       error: process.env.NODE_ENV === 'development' ? error.message : undefined
//     });
//   }
// };


// Get user profile
const getUserProfile = async (req, res) => {
    try {
      const userId = req.params.id;
      
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password_hash'] },
        include: [
          {
            model: FamilyMember,
            attributes: ['member_id', 'gender', 'date_of_birth', 'relationship']
          },
          {
            model: UserSecurity,
            attributes: ['fingerprint_enabled', 'push_notifications_enabled', 'dark_mode_enabled']
          }
        ]
      });
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
      
      res.status(200).json({
        success: true,
        data: user
      });
      
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching user profile'
      });
    }
  };
  
  module.exports = {
    registerUser,
    getUserProfile
  };
  