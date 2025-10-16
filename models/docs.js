const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Make sure you import your sequelize instance

const TenderDocs = sequelize.define(
  'TenderDocs',
  {
    fld_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tg_main_tender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    file_doc_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_doc_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file_doc_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    file_doc_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    entry_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modified_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender_docs',
    timestamps: false, // Because you're manually handling dates
  },
);

module.exports = TenderDocs;
