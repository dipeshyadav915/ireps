const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Make sure you import your sequelize instance

const TenderDates = sequelize.define(
  'TenderDates',
  {
    critical_dates_id: {
      type: DataTypes.INTEGER, // Primary key, auto-increment
      primaryKey: true,
      autoIncrement: true,
    },
    tg_main_tender_id: {
      type: DataTypes.INTEGER, // Foreign key referencing the main tender
      allowNull: true,
    },
    tnd_published_date: {
      type: DataTypes.STRING, // Date when the tender is published
      allowNull: true,
    },
    tnd_published_time: {
      type: DataTypes.TIME, // Time when the tender is published
      allowNull: true,
    },
    bid_opening_date: {
      type: DataTypes.STRING, // Date when the bid opening occurs
      allowNull: true,
    },
    bid_opening_time: {
      type: DataTypes.TIME, // Time of bid opening
      allowNull: true,
    },
    doc_download_start_date: {
      type: DataTypes.STRING, // Start date for document download
      allowNull: true,
    },
    doc_download_start_time: {
      type: DataTypes.TIME, // Start time for document download
      allowNull: true,
    },
    doc_download_end_date: {
      type: DataTypes.STRING, // End date for document download
      allowNull: true,
    },
    doc_download_end_time: {
      type: DataTypes.TIME, // End time for document download
      allowNull: true,
    },
    clarification_start_date: {
      type: DataTypes.STRING, // Start date for clarifications
      allowNull: true,
    },
    clarification_start_time: {
      type: DataTypes.TIME, // Start time for clarifications
      allowNull: true,
    },
    clarification_end_date: {
      type: DataTypes.STRING, // End date for clarifications
      allowNull: true,
    },
    clarification_end_time: {
      type: DataTypes.TIME, // End time for clarifications
      allowNull: true,
    },
    submission_start_time: {
      type: DataTypes.TIME, // Start time for tender submission
      allowNull: true,
    },
    submission_end_time: {
      type: DataTypes.TIME, // End time for tender submission
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // Status of the tender (e.g., 'active', 'closed')
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.STRING, // Entry date for the record
      allowNull: true,
    },
    updated_date: {
      type: DataTypes.STRING, // Last updated date
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING, // Who last updated the record
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender_dates', // The table name in the database
    timestamps: false, // No timestamps like `createdAt`, `updatedAt`
  },
);

module.exports = TenderDates;
