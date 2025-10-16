const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Import Sequelize instance
const ContactQuery = sequelize.define(
  'ContactQuery',
  {
    fld_id: {
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
    },
    mobile_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'contact_query', // Name of the table in your database
    timestamps: false, // if the table does not have `createdAt` and `updatedAt` fields
  },
);
module.exports = ContactQuery;
