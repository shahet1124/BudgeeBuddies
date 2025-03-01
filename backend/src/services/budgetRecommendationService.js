const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

/**
 * Generate budget recommendations based on user profile and family details
 * @param {Object} userData - User profile data
 * @param {Array} familyMembers - Family member details
 * @param {Number} monthlyIncome - Monthly income amount
 * @returns {Object} Budget recommendations by dynamically generated categories
 */
const generateBudgetRecommendations = async (userData, familyMembers, monthlyIncome) => {
  try {
    // Calculate age of each family member
    const calculateAge = (dateOfBirth) => {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    };

    // Process family data
    const processedFamilyData = familyMembers.map(member => ({
      gender: member.gender,
      age: calculateAge(member.date_of_birth),
      relationship: member.relationship || 'Other'
    }));

    // Add user to family data
    processedFamilyData.push({
      gender: userData.gender || 'Not Specified',
      age: calculateAge(userData.date_of_birth),
      relationship: 'Self'
    });

    // Count children and adults
    const childrenCount = processedFamilyData.filter(member => member.age < 18).length;
    const adultCount = processedFamilyData.length - childrenCount;

    // Get location data from user address
    const location = {
      city: userData.city,
      state: userData.state,
      pincode: userData.pincode
    };

    // Initialize Gemini SDK
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // You can change the model if needed

    // Prompt to dynamically generate categories based on user data
    const prompt = `Generate a detailed monthly budget breakdown for a family with the following details:
      - Monthly income: ${monthlyIncome}
      - Location: ${location.city}, ${location.state}, ${location.pincode}
      - Family composition: ${adultCount} adults, ${childrenCount} children
      - Age breakdown: ${processedFamilyData.map(m => `${m.gender} (${m.age})`).join(', ')}
      
    Suggest categories for budgeting based on the family's composition, income, and location. For each category, provide an estimated monthly budget amount in INR. Return the response as a JSON object with the category names and the suggested amounts.`;

    const result = await model.generateContent(prompt);

    // Extract the response text
    const aiResponse = result.response.text();  // Get response text from the result
    try {
      const categoryMap = JSON.parse(aiResponse);  // Try parsing the response as JSON
      return categoryMap;  // Return AI-generated budget categories
    } catch (e) {
      console.error("Error parsing AI response:", e);

      // Fallback to manual categorization if the AI response is not valid
      return getFallbackBudget(monthlyIncome, childrenCount);
    }

  } catch (error) {
    console.error('Error generating budget recommendations:', error);
    // Fallback to basic budget allocation if there's an error
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
  // Base percentages for different expense categories
  const basePercentages = {
    "Food & Groceries": 0.25,
    "Transport": 0.10,
    "Housing": 0.30,
    "Healthcare": 0.07,
    "Education": childrenCount > 0 ? 0.10 : 0.05,
    "Entertainment & Leisure": 0.05,
    "Savings": 0.10,
    "Miscellaneous": 0.05
  };

  // Calculate budget for each category
  const budget = {};
  for (const [category, percentage] of Object.entries(basePercentages)) {
    let amount = Math.round(monthlyIncome * percentage);
    budget[category] = amount;
  }
  
  return budget;
};

module.exports = {
  generateBudgetRecommendations
};

// const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();

// /**
//  * Generate budget recommendations based on user profile and family details
//  * @param {Object} userData - User profile data
//  * @param {Array} familyMembers - Family member details
//  * @param {Number} monthlyIncome - Monthly income amount
//  * @returns {Object} Budget recommendations by category
//  */
// const generateBudgetRecommendations = async (userData, familyMembers, monthlyIncome) => {
//   try {
//     // Calculate age of each family member
//     const calculateAge = (dateOfBirth) => {
//       const today = new Date();
//       const birthDate = new Date(dateOfBirth);
//       let age = today.getFullYear() - birthDate.getFullYear();
//       const monthDiff = today.getMonth() - birthDate.getMonth();
      
//       if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
//         age--;
//       }
//       return age;
//     };

//     // Process family data
//     const processedFamilyData = familyMembers.map(member => ({
//       gender: member.gender,
//       age: calculateAge(member.date_of_birth),
//       relationship: member.relationship || 'Other'
//     }));

//     // Add user to family data
//     processedFamilyData.push({
//       gender: userData.gender || 'Not Specified',
//       age: calculateAge(userData.date_of_birth),
//       relationship: 'Self'
//     });

//     // Count children and adults
//     const childrenCount = processedFamilyData.filter(member => member.age < 18).length;
//     const adultCount = processedFamilyData.length - childrenCount;

//     // Get location data from user address
//     const location = {
//       city: userData.city,
//       state: userData.state,
//       pincode: userData.pincode
//     };

//     // Initialize Gemini SDK
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // You can change the model if needed

//     // Option 1: Use Gemini API for intelligent budget allocation
//     const prompt = `Generate a monthly budget breakdown for a family with the following details:
//       - Monthly income: ${monthlyIncome}
//       - Location: ${location.city}, ${location.state}, ${location.pincode}
//       - Family composition: ${adultCount} adults, ${childrenCount} children
//       - Age breakdown: ${processedFamilyData.map(m => `${m.gender} (${m.age})`).join(', ')}

//       Return a JSON object with the following expense categories and recommended amounts:
//       Food, Transport, Rent, Utilities, Healthcare, Education, Entertainment, Savings, Miscellaneous.
//       Each value should be a number representing monthly amount in INR.`;

//     const result = await model.generateContent(prompt);

//     // Extract budget recommendations from Gemini's response
//     const aiResponse = result.response.text();  // Get response text from the result
//     try {
//       return JSON.parse(aiResponse);  // Try parsing the response as JSON
//     } catch (e) {
//       // In case Gemini doesn't return proper JSON, extract numbers from text
//       const categoryMap = {};
//       const categories = ['Food', 'Transport', 'Rent', 'Utilities', 'Healthcare', 
//                           'Education', 'Entertainment', 'Savings', 'Miscellaneous'];
      
//       categories.forEach(category => {
//         const regex = new RegExp(`${category}[^0-9]*([0-9,]+)`, 'i');
//         const match = aiResponse.match(regex);
//         if (match && match[1]) {
//           categoryMap[category] = parseFloat(match[1].replace(/,/g, ''));
//         }
//       });
      
//       return categoryMap;
//     }
//   } catch (error) {
//     console.error('Error generating budget recommendations:', error);
    
//     // Fallback to basic budget allocation
//     return {
//       Food: Math.round(monthlyIncome * 0.25),
//       Transport: Math.round(monthlyIncome * 0.10),
//       Rent: Math.round(monthlyIncome * 0.30),
//       Utilities: Math.round(monthlyIncome * 0.08),
//       Healthcare: Math.round(monthlyIncome * 0.07),
//       Entertainment: Math.round(monthlyIncome * 0.05),
//       Savings: Math.round(monthlyIncome * 0.10),
//       Miscellaneous: Math.round(monthlyIncome * 0.05)
//     };
//   }
// };

// module.exports = {
//   generateBudgetRecommendations
// };
