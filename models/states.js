const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const States = sequelize.define(
  'States',
  {
    state_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    state_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alias_name_1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_6: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_7: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_8: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_9: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    alias_name_10: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
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
    status: {
      type: DataTypes.STRING, // Modify this if the status is an ENUM or BOOLEAN
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
    tableName: 'gg_mstr_state',
    timestamps: false, // If your table does not have Sequelize's default createdAt and updatedAt
  },
);

module.exports = States;
