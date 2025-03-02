const express = require('express');
//const { getUserProfile, registerBasicUser, registerCompleteUser } = require('../controllers/userControllers');
const { getUserProfile, registerBasicUser, registerCompleteUser } = require('../controllers/userControllers')
const { validateUserRegistration } = require('../middlewares/validateUser');
const { generateBudgetRecommendations } = require('../services/budgetRecommendationService');  // Importing the service

const router = express.Router();

// Route for registering basic user info (Step 1)
router.post('/register/basic', registerBasicUser);

// Route for completing user info (Step 2)
router.post('/register/final', registerCompleteUser);

// // User registration route
// router.post('/register', validateUserRegistration, registerUser);
// /api/register/complete
// router.post('/register', bas)

// Get user profile route
router.get('/profile/:id', getUserProfile);

// New route for generating budget recommendations
router.post('/generate-budget', async (req, res) => {
  const { userData, familyMembers, monthlyIncome } = req.body;

  console.log("Received request body:", req.body); // Debugging log
  console.log("Extracted userData:", userData);
  console.log("Extracted familyMembers:", familyMembers);
  console.log("Extracted monthlyIncome:", monthlyIncome);

  // Check if required values are missing
  if (!userData || monthlyIncome === undefined || monthlyIncome === null) {
    return res.status(400).json({ error: "Missing required fields: userData or monthlyIncome" });
  }

  try {
    // Call the generateBudgetRecommendations function
    const budgetRecommendations = await generateBudgetRecommendations(userData, familyMembers, monthlyIncome);
    res.json(budgetRecommendations);
  } catch (error) {
    console.error("Error generating budget recommendations:", error);
    res.status(500).json({ error: 'Error generating budget recommendations' });
  }
});


module.exports = router;
