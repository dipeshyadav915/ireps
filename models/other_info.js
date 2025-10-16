const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Make sure you import your sequelize instance

const TenderOtherInfo = sequelize.define(
  'TenderOtherInfo',
  {
    fld_id: {
      type: DataTypes.INTEGER, // Assuming it's an integer
      primaryKey: true,
      autoIncrement: true,
    },
    rz_tender_id: {
      type: DataTypes.INTEGER, // Foreign key to another table (e.g., tender)
      allowNull: true,
    },
    tg_main_tender_id: {
      type: DataTypes.INTEGER, // Foreign key to `tg_main_tender` table
      allowNull: true,
    },
    product_category_id: {
      type: DataTypes.INTEGER, // ID for the product category
      allowNull: true,
    },
    form_of_contract: {
      type: DataTypes.STRING, // Contract type (e.g., 'fixed-price', 'cost-plus')
      allowNull: true,
    },
    no_of_covers: {
      type: DataTypes.INTEGER, // Number of covers
      allowNull: true,
    },
    payment_mode: {
      type: DataTypes.STRING, // Mode of payment (e.g., 'online', 'cheque')
      allowNull: true,
    },
    general_technical_evaluation_allowed: {
      type: DataTypes.STRING, // Whether technical evaluation is allowed (e.g., 'Yes', 'No')
      allowNull: true,
    },
    item_wise_technical_value: {
      type: DataTypes.STRING, // Item-wise technical evaluation value
      allowNull: true,
    },
    is_multicurrency_allowed_for_boq: {
      type: DataTypes.STRING, // Whether multicurrency is allowed for BOQ (e.g., 'Yes', 'No')
      allowNull: true,
    },
    is_multicurrency_allowed_for_fee: {
      type: DataTypes.STRING, // Whether multicurrency is allowed for fee (e.g., 'Yes', 'No')
      allowNull: true,
    },
    allowed_two_stage_bidding: {
      type: DataTypes.STRING, // Whether two-stage bidding is allowed (e.g., 'Yes', 'No')
      allowNull: true,
    },
    nda_pre_qualification: {
      type: DataTypes.STRING, // NDA pre-qualification requirement (e.g., 'Yes', 'No')
      allowNull: true,
    },
    independent_external_monitor_remark: {
      type: DataTypes.STRING, // Independent external monitor remarks
      allowNull: true,
    },
    contract_type: {
      type: DataTypes.STRING, // Type of contract (e.g., 'Lump Sum', 'Unit Rate')
      allowNull: true,
    },
    bid_validity: {
      type: DataTypes.DATE, // Bid validity date
      allowNull: true,
    },
    period_of_work: {
      type: DataTypes.STRING, // Duration of the work
      allowNull: true,
    },
    region_code: {
      type: DataTypes.STRING, // Code for the region
      allowNull: true,
    },
    pre_bid_meeting_place: {
      type: DataTypes.STRING, // Pre-bid meeting place
      allowNull: true,
    },
    pre_bid_meeting_address: {
      type: DataTypes.STRING, // Pre-bid meeting address
      allowNull: true,
    },
    pre_bid_meeting_date: {
      type: DataTypes.STRING, // Pre-bid meeting date
      allowNull: true,
    },
    pre_bid_meeting_time: {
      type: DataTypes.TIME, // Pre-bid meeting time
      allowNull: true,
    },
    bid_opening_place: {
      type: DataTypes.STRING, // Bid opening place
      allowNull: true,
    },
    should_allow_nda_tnd: {
      type: DataTypes.STRING, // Whether NDA tender should be allowed (e.g., 'Yes', 'No')
      allowNull: true,
    },
    allow_preferential_bidder: {
      type: DataTypes.STRING, // Whether preferential bidders are allowed (e.g., 'Yes', 'No')
      allowNull: true,
    },
    number_of_cover: {
      type: DataTypes.INTEGER, // Number of covers in the tender
      allowNull: true,
    },
    instrument_type: {
      type: DataTypes.STRING, // Type of instrument (e.g., 'Bank Guarantee', 'Cheque')
      allowNull: true,
    },
    withdrawal_allowed: {
      type: DataTypes.STRING, // Whether withdrawal is allowed (e.g., 'Yes', 'No')
      allowNull: true,
    },
    tnd_status: {
      type: DataTypes.STRING, // Status of the tender (e.g., 'active', 'inactive')
      allowNull: true,
    },
    pincode: {
      type: DataTypes.STRING, // Pincode for location
      allowNull: true,
    },
    email_id: {
      type: DataTypes.STRING, // Email ID
      allowNull: true,
    },
    phone_no: {
      type: DataTypes.STRING, // Phone number
      allowNull: true,
    },
    tnd_type: {
      type: DataTypes.STRING, // Type of tender (e.g., 'Open', 'Limited')
      allowNull: true,
    },
    tnd_category_id: {
      type: DataTypes.INTEGER, // Category ID for the tender
      allowNull: true,
    },
    tnd_sub_category_id: {
      type: DataTypes.INTEGER, // Subcategory ID for the tender
      allowNull: true,
    },
    funding_agency_id: {
      type: DataTypes.INTEGER, // ID for the funding agency
      allowNull: true,
    },
    client_cont_person: {
      type: DataTypes.STRING, // Contact person for the client
      allowNull: true,
    },
    client_cont_address: {
      type: DataTypes.STRING, // Contact address for the client
      allowNull: true,
    },
    org_id: {
      type: DataTypes.INTEGER, // ID for the organization
      allowNull: true,
    },
    dep_id: {
      type: DataTypes.INTEGER, // Department ID
      allowNull: true,
    },
    div_id: {
      type: DataTypes.INTEGER, // Division ID
      allowNull: true,
    },
    subdiv_id: {
      type: DataTypes.INTEGER, // Subdivision ID
      allowNull: true,
    },
    branch_id: {
      type: DataTypes.INTEGER, // Branch ID
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING, // Status of the record
      allowNull: true,
    },
    entry_date: {
      type: DataTypes.DATE, // Entry date for the record
      allowNull: true,
    },
    modified_by: {
      type: DataTypes.STRING, // Who last modified the record
      allowNull: true,
    },
    modified_date: {
      type: DataTypes.DATE, // Date when the record was last modified
      allowNull: true,
    },
  },
  {
    tableName: 'tg_main_tender_otherinfo', // The table name in the database
    timestamps: false, // No timestamps like `createdAt`, `updatedAt`
  },
);

module.exports = TenderOtherInfo;
