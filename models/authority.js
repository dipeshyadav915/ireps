const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Import Sequelize instance

const Organization = sequelize.define(
  'Organization',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correct_client_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clnt_alias_name_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clnt_alias_name_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clnt_alias_name_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('1', '0'),
      defaultValue: '1',
    },
    entry_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    website_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'orgtg_master_org', // Explicitly specify the table name
    timestamps: false, // Disable default `createdAt` and `updatedAt` columns
  },
);

module.exports = Organization;
