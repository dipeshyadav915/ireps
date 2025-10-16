const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Ensure this points to your sequelize instance

const ContentSEO = sequelize.define(
  'ContentSEO',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    page_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    action_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'), // Adjust based on your specific status values
      allowNull: false,
      defaultValue: 'active',
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    modefited_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modefied_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'content_seo', // Maps to your database table
    timestamps: false, // Disable automatic createdAt and updatedAt
  },
);

module.exports = ContentSEO;
