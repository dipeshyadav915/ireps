const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const AppMenuMaster = sequelize.define(
  'AppMenuMaster',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    menu_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    action_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    menu_category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_in_childmenu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    sector_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dept_client_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    menu_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'app_menu_master',
    timestamps: false, // Disable timestamps if the table doesn't have createdAt and updatedAt
  },
);

module.exports = AppMenuMaster;
