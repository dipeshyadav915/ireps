const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Sector = sequelize.define(
  'Sector',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sectName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    image_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tender_count_live: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tender_count_archive: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    types: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    modified_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'gg_mstr_sector',
    timestamps: false,
  },
);

module.exports = Sector;
