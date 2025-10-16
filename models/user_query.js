// models/userQuery.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // This assumes you have a configured Sequelize instance

const UserQuery = sequelize.define(
  'UserQuery',
  {
    // Define the fields in the model
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: 'user_query', // Specify the table name if it's not the default (which is the pluralized model name)
  },
);

module.exports = UserQuery;
