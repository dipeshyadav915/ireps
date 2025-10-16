const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const TenderEmd = sequelize.define(
  'TenderEmd',
  {
    emd_id: {
      type: DataTypes.INTEGER, // Assuming it's an integer
      primaryKey: true,
      autoIncrement: true,
    },
    tg_main_tender_id: {
      type: DataTypes.INTEGER, // Assuming this is a foreign key to `tg_main_tender`
      allowNull: false,
    },
    emd_amount: {
      type: DataTypes.FLOAT, // Adjust if it should be a different type (e.g., INTEGER, DECIMAL)
      allowNull: true,
    },
    emd_fee_type: {
      type: DataTypes.STRING, // Type of fee (e.g., 'Fixed', 'Percentage')
      allowNull: true,
    },
    emd_payable_to: {
      type: DataTypes.STRING, // Who the fee is payable to
      allowNull: true,
    },
    emd_payable_at: {
      type: DataTypes.STRING, // Location or organization where the fee is payable
      allowNull: true,
    },
    emd_percentage: {
      type: DataTypes.FLOAT, // Percentage value for the fee (if applicable)
      allowNull: true,
    },
    emd_through_BG_ST_orEMD_exemption_allowed: {
      type: DataTypes.STRING, // Possible values like 'Yes', 'No'
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // Status of the EMD (e.g., 'active', 'inactive')
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE, // Date the record was created
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING, // User who last updated the record
      allowNull: true,
    },
    updated_date: {
      type: DataTypes.DATE, // Last updated date
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender_emd', // The table name in the database
    timestamps: false, // If no timestamps like `createdAt` and `updatedAt` are present
  },
);

module.exports = TenderEmd;
