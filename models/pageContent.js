const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const PageContent = sequelize.define(
  'PageContent',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('1', '2'),
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'page_content',
    timestamps: false, // Set to true if you want to track createdAt/updatedAt
  },
);

// Export the model
module.exports = PageContent;
