const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const AdvanceSeo = sequelize.define(
  'AdvanceSeo',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    page_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    selectType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sector_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    auth_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    website_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    meta_key: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    meta_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    header_content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    page_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'advance_seo',
    timestamps: false,
  },
);

module.exports = AdvanceSeo;
