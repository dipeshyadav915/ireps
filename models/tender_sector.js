const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TenderSectors = sequelize.define(
  'TenderSectors',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tg_main_tender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sector_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender_sectors',
    timestamps: false, // Set this to false if createdAt/updatedAt columns are not used
  },
);
module.exports = TenderSectors;
