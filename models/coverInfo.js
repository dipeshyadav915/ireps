const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TenderCoverInfo = sequelize.define(
  'TenderCoverInfo',
  {
    fld_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tg_main_tender_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doc_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entry_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender_coverinfo',
    timestamps: false,
  },
);

module.exports = TenderCoverInfo;
