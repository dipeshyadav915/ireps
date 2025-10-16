const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const MainTender = sequelize.define(
  'MainTender',
  {
    fld_id: {
      type: DataTypes.INTEGER, // Assuming it's an integer, adjust if necessary
      primaryKey: true,
      autoIncrement: true,
      // allowNull: false,
    },
    gg_tender_id: {
      type: DataTypes.STRING, // Adjust type according to actual data (e.g., INTEGER, STRING)
      allowNull: true,
    },
    website_id: {
      type: DataTypes.STRING, // Adjust type if necessary
      allowNull: true,
    },
    tnd_ref_id: {
      type: DataTypes.STRING, // Adjust type if necessary
      allowNull: true,
    },
    tender_gov_id: {
      type: DataTypes.STRING, // Adjust type if necessary
      allowNull: true,
    },
    tender_details: {
      type: DataTypes.TEXT, // For longer text or descriptions
      allowNull: true,
    },
    tnd_title: {
      type: DataTypes.STRING, // Assuming title is a string
      allowNull: true,
    },
    tender_amnt_val: {
      type: DataTypes.FLOAT, // Adjust to the correct data type for amounts
      allowNull: true,
    },
    tender_emd_amnt_val: {
      type: DataTypes.FLOAT, // Adjust to the correct data type for amounts
      allowNull: true,
    },
    currency_id: {
      type: DataTypes.INTEGER, // Assuming it's a foreign key to a currency table
      allowNull: true,
    },
    client_id: {
      type: DataTypes.INTEGER, // Foreign key to client table (assumed)
      allowNull: true,
    },
    client_country_id: {
      type: DataTypes.INTEGER, // Assuming it's a foreign key to a country table
      allowNull: true,
    },
    client_state_id: {
      type: DataTypes.INTEGER, // Foreign key to state table
      allowNull: true,
    },
    client_city_id: {
      type: DataTypes.INTEGER, // Foreign key to city table
      allowNull: true,
    },
    sector_ids: {
      type: DataTypes.STRING, // Assuming it's a comma-separated list of sector IDs
      allowNull: true,
    },
    submission_start_date: {
      type: DataTypes.DATE, // Adjust if the format is different (e.g., STRING)
      allowNull: true,
    },
    submission_end_date: {
      type: DataTypes.DATE, // Adjust if the format is different (e.g., STRING)
      allowNull: true,
    },
    tnd_update: {
      type: DataTypes.TINYINT, // Adjust as needed
      allowNull: true,
    },
    is_update: {
      type: DataTypes.BOOLEAN, // Boolean value (true/false)
      allowNull: true,
    },
    corr_last_update: {
      type: DataTypes.DATE, // Adjust as needed
      allowNull: true,
    },
    is_doc_avl: {
      type: DataTypes.BOOLEAN, // Boolean value (true/false)
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // Status is likely a string (e.g., 'active', 'inactive')
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE, // Adjust if the format is different (e.g., STRING)
      allowNull: true,
    },
    entry_by: {
      type: DataTypes.STRING, // The user who created the entry
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.STRING, // The user who last modified the record
      allowNull: true,
    },
    modified_date: {
      type: DataTypes.DATE, // The date when the record was last modified
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender', // The table name in your database
    timestamps: false, // Assuming no timestamps like createdAt/updatedAt are being used
  },
);

module.exports = MainTender;
