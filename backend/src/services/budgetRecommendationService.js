const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

/**
 * Generate budget recommendations based on user profile and family details
 * @param {Object} userData - User profile data
 * @param {Array} familyMembers - Family member details (optional)
 * @param {Number} monthlyIncome - Monthly income amount
 * @returns {Object} Budget recommendations by dynamically generated categories
 */
const generateBudgetRecommendations = async (
  userData,
  familyMembers = [],
  monthlyIncome
) => {
  try {
    if (!userData || !monthlyIncome) {
      throw new Error("Invalid input data: userData or monthlyIncome is missing.");
    }

    // Helper function to calculate age
    const calculateAge = (dateOfBirth) => {
      if (!dateOfBirth) return null;
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    // Ensure familyMembers is always an array
    const processedFamilyData = Array.isArray(familyMembers)
      ? familyMembers.map((member) => ({
          gender: member.gender || "Not Specified",
          age: calculateAge(member.date_of_birth) || "Unknown",
          relationship: member.relationship || "Other",
        }))
      : [];

    // Add user to family data
    processedFamilyData.push({
      gender: userData.gender || "Not Specified",
      age: calculateAge(userData.date_of_birth) || "Unknown",
      relationship: "Self",
    });

    // Count children and adults
    const childrenCount = processedFamilyData.filter((member) => member.age !== "Unknown" && member.age < 18).length;
    const adultCount = processedFamilyData.length - childrenCount;

    // Get location data from user address
    const location = {
      city: userData.city || "Unknown",
      state: userData.state || "Unknown",
      pincode: userData.pincode || "Unknown",
    };

    // Initialize Gemini SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Prompt to dynamically generate categories based on user data
    const prompt = `Generate a detailed monthly budget breakdown for a family with the following details:
      - Monthly income: ${monthlyIncome}
      - Location: ${location.city}, ${location.state}, ${location.pincode}
      - Family composition: ${adultCount} adults, ${childrenCount} children
      - Age breakdown: ${processedFamilyData.map(m => `${m.gender} (${m.age})`).join(', ')}

    Suggest categories for budgeting based on the family's composition, income, and location. 
    For each category, provide an estimated monthly budget amount in INR. 
    Return the response as a JSON object with the category names and suggested amounts.`;

    const result = await model.generateContent(prompt);

    // Extract the response text safely
    if (!result || !result.response) {
      throw new Error("Invalid response from AI model.");
    }

    const aiResponse = result.response.text();

    try {
      const categoryMap = JSON.parse(aiResponse);
      return categoryMap;
    } catch (e) {
      console.error("Error parsing AI response:", e);
      return getFallbackBudget(monthlyIncome, childrenCount);
    }
  } catch (error) {
    console.error("Error generating budget recommendations:", error);
    return getFallbackBudget(monthlyIncome);
  }
};

/**
 * Fallback budget calculation based on predefined categories
 * @param {Number} monthlyIncome - Monthly income amount
 * @param {Number} childrenCount - Number of children in the family
 * @returns {Object} Fallback budget breakdown
 */
const getFallbackBudget = (monthlyIncome, childrenCount = 0) => {
  const basePercentages = {
    "Food & Groceries": 0.25,
    "Transport": 0.10,
    "Housing": 0.30,
    "Healthcare": 0.07,
    "Education": childrenCount > 0 ? 0.10 : 0.05,
    "Entertainment & Leisure": 0.05,
    "Savings": 0.10,
    "Miscellaneous": 0.05,
  };

  const budget = {};
  for (const [category, percentage] of Object.entries(basePercentages)) {
    budget[category] = Math.round(monthlyIncome * percentage);
  }

  return budget;
};

module.exports = {
  generateBudgetRecommendations,
};
