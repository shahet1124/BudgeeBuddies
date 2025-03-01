//routes/userRoutes.js
const express = require('express');
const { registerUser, getUserProfile } = require('../controllers/userControllers');
const { validateUserRegistration } = require('../middlewares/validateUser');

const router = express.Router();

// User registration route
router.post('/register', validateUserRegistration, registerUser);

// Get user profile route
router.get('/profile/:id', getUserProfile);

module.exports = router;