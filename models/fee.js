const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Make sure you import your sequelize instance

const TenderFee = sequelize.define(
  'TenderFee',
  {
    fee_id: {
      type: DataTypes.INTEGER, // Assuming it's an integer
      primaryKey: true,
      autoIncrement: true,
    },
    tg_main_tender_id: {
      type: DataTypes.INTEGER, // Foreign key to `tg_main_tender` table
      allowNull: false,
    },
    tnd_fee: {
      type: DataTypes.FLOAT, // The fee amount (adjust type if necessary)
      allowNull: true,
    },
    processing_fee: {
      type: DataTypes.FLOAT, // The processing fee (adjust type if necessary)
      allowNull: true,
    },
    fee_payable_to: {
      type: DataTypes.STRING, // Who the fee is payable to
      allowNull: true,
    },
    fee_payable_at: {
      type: DataTypes.STRING, // Where the fee is payable at
      allowNull: true,
    },
    tnd_fee_exemption_allowed: {
      type: DataTypes.STRING, // If fee exemption is allowed (e.g., 'Yes', 'No')
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // Status of the fee (e.g., 'active', 'inactive')
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE, // Date the record was created
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.STRING, // User who last modified the record
      allowNull: true,
    },
    modified_date: {
      type: DataTypes.DATE, // Last modified date
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender_fee', // The table name in the database
    timestamps: false, // If no timestamps like `createdAt` and `updatedAt` are present
  },
);

module.exports = TenderFee;
