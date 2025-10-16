const sequelize = require('../sequelize');
const TenderDates = require('./date');
const TenderEmd = require('./emd');
const TenderFee = require('./fee');
const MainTender = require('./main_tender');
const TenderOtherInfo = require('./other_info');
const Sector = require('./sector');
const Authority = require('./authority');
const ContactQuery = require('./contact');
const TenderSectors = require('./tender_sector');
const UserQuery = require('./user_query');
const City = require('./city');
const States = require('./states');
const Country = require('./country');
const AdvanceSeo = require('./advanceSeo');
const SeoSearchMeta = require('./search_metaData');
const AppMenuMaster = require('./appmenumaster');
const ContentSEO = require('./contentSeo');
const Admin = require('./admins');
const CoverInfo = require('./coverInfo');
const TenderDocs = require('./docs');
const ArchiveMainTender = require('./archive_main_tender');
const ArchiveCoverinfo = require('./archive_coverInfo');
const ArchiveDates = require('./archive_dates');
const ArchiveDocs = require('./archive_docs');
const ArchiveEmd = require('./archive_emd');
const ArchiveFee = require('./archive_fee');
const ArchiveOtherinfo = require('./archive_other_info');
const ArchiveTenderSectors = require('./archive_sector');
const PageContent = require('./pageContent');
const AboutSection = require('./about_section');

module.exports = {
  PageContent,
  Admin,
  AdvanceSeo,
  AppMenuMaster,
  ArchiveCoverinfo,
  ArchiveMainTender,
  ArchiveDates,
  ArchiveDocs,
  ArchiveTenderSectors,
  ArchiveOtherinfo,
  ArchiveFee,
  ArchiveEmd,
  Authority,
  City,
  ContactQuery,
  ContentSEO,
  Country,
  CoverInfo,
  MainTender,
  AboutSection,
  SeoSearchMeta,
  Sector,
  States,
  TenderDates,
  TenderDocs,
  TenderEmd,
  TenderFee,
  TenderOtherInfo,
  TenderSectors,
  UserQuery,
  sequelize,
};
