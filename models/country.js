const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Country = sequelize.define(
  'Country',
  {
    country_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    region_country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_gmt_timezone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tender_count_live: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tender_count_archive: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    alias_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_9: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // Modify this if status is an ENUM or BOOLEAN
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'gg_mstr_country',
    timestamps: false, // If your table does not have Sequelize's default createdAt and updatedAt
  },
);

module.exports = Country;
