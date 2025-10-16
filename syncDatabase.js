require('dotenv').config({ path: '.env.local' });
const sequelize = require('./sequelize');
const models = require('./models/index');
(async () => {
  console.log('Starting script...');
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');

    await sequelize.sync({ alter: false });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    await sequelize.close();
  }
})();
