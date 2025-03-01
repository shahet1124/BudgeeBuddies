
// server.js
require('dotenv').config();
const app = require('./app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database models (for development)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized');
    }
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Start server
(async () => {
  await testConnection();
  
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
