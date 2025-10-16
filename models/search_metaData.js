const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const SeoSearchMeta = sequelize.define(
  'SeoSearchMeta',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    page_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    meta_key: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    meta_desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    page_type: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'seo_search_meta',
    timestamps: false, // Set to true if the table has `createdAt` and `updatedAt`
  },
);

module.exports = SeoSearchMeta;
