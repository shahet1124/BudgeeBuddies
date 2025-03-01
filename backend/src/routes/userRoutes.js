const express = require('express');
const { registerUser, getUserProfile } = require('../controllers/userControllers');
const { validateUserRegistration } = require('../middlewares/validateUser');
const { generateBudgetRecommendations } = require('../services/budgetRecommendationService');  // Importing the service

const router = express.Router();

// User registration route
router.post('/register', validateUserRegistration, registerUser);

// Get user profile route
router.get('/profile/:id', getUserProfile);

// New route for generating budget recommendations
router.post('/generate-budget', async (req, res) => {
  const { userData, familyMembers, monthlyIncome } = req.body;

  try {
    // Call the generateBudgetRecommendations function from the service
    const budgetRecommendations = await generateBudgetRecommendations(userData, familyMembers, monthlyIncome);
    res.json(budgetRecommendations);
  } catch (error) {
    res.status(500).json({ error: 'Error generating budget recommendations' });
  }
});

module.exports = router;
