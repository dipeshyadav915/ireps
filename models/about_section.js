const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const AboutSection = sequelize.define(
  'AboutSection',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM('0', '1'),
      allowNull: false,
    },
  },
  {
    tableName: 'about_content',
    timestamps: false, // Set to true if you want createdAt and updatedAt fields
  },
);

module.exports = AboutSection;
