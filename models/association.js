const MainTender = require('./main_tender');
const TenderDates = require('./date');
const TenderEMD = require('./emd');
const CoverInfo = require('./coverInfo');
const TenderFee = require('./fee');
const OtherInfo = require('./other_info');
const Auth = require('./authority');
const States = require('./states');
const City = require('./city');
const Country = require('./country');
const AppMenuMaster = require('./appmenumaster');
const SeoSearchMeta = require('./search_metaData');
const Sector = require('./sector');
const Authority = require('./authority');
const AdvanceSeo = require('./advanceSeo');
const PageContent = require('./pageContent');

// Define relationships
MainTender.hasOne(TenderDates, {
  foreignKey: 'tg_main_tender_id',
  sourceKey: 'fld_id',
  as: 'dates',
});

MainTender.hasOne(TenderEMD, {
  foreignKey: 'tg_main_tender_id',
  sourceKey: 'fld_id',
  as: 'emd',
});

MainTender.hasOne(CoverInfo, {
  foreignKey: 'tg_main_tender_id',
  sourceKey: 'fld_id',
  as: 'coverInfo',
});

CoverInfo.belongsTo(MainTender, {
  foreignKey: 'tg_main_tender_id',
  targetKey: 'fld_id',
  as: 'mainTender',
});

TenderEMD.belongsTo(MainTender, {
  foreignKey: 'tg_main_tender_id',
  targetKey: 'fld_id',
  as: 'mainTender',
});

MainTender.hasOne(TenderFee, {
  foreignKey: 'tg_main_tender_id',
  sourceKey: 'fld_id',
  as: 'fees',
});

TenderFee.belongsTo(MainTender, {
  foreignKey: 'tg_main_tender_id',
  targetKey: 'fld_id',
  as: 'mainTender',
});

MainTender.hasOne(OtherInfo, {
  foreignKey: 'tg_main_tender_id',
  sourceKey: 'fld_id',
  as: 'otherInfo',
});

OtherInfo.belongsTo(MainTender, {
  foreignKey: 'tg_main_tender_id',
  targetKey: 'fld_id',
  as: 'mainTender',
});

Auth.hasMany(MainTender, {
  foreignKey: 'client_id',
  sourceKey: 'id',
  as: 'mainTender',
});

MainTender.belongsTo(Auth, {
  foreignKey: 'client_id',
  targetKey: 'id',
  as: 'auth',
});

City.hasMany(MainTender, {
  foreignKey: 'client_city_id',
  sourceKey: 'city_id',
  as: 'tenders',
});

States.hasMany(MainTender, {
  foreignKey: 'client_state_id',
  sourceKey: 'state_id',
  as: 'tenders',
});

Country.hasMany(MainTender, {
  foreignKey: 'client_country_id',
  sourceKey: 'country_id',
  as: 'tenders',
});

MainTender.belongsTo(City, {
  foreignKey: 'client_city_id',
  targetKey: 'city_id',
  as: 'city',
});

MainTender.belongsTo(States, {
  foreignKey: 'client_state_id',
  targetKey: 'state_id',
  as: 'states',
});
MainTender.belongsTo(Country, {
  foreignKey: 'client_country_id',
  targetKey: 'country_id',
  as: 'country',
});

AppMenuMaster.hasOne(SeoSearchMeta, {
  foreignKey: 'page_id',
  sourceKey: 'fld_id',
  as: 'seoMeta',
});

SeoSearchMeta.belongsTo(AppMenuMaster, {
  foreignKey: 'page_id',
  targetKey: 'fld_id',
  as: 'menuMaster',
});

AdvanceSeo.belongsTo(Sector, {
  foreignKey: 'sector_id',
  targetKey: 'fld_id',
  as: 'sector',
});

AdvanceSeo.belongsTo(Authority, {
  foreignKey: 'auth_id',
  targetKey: 'id',
  as: 'authority',
});

Sector.hasOne(AdvanceSeo, {
  foreignKey: 'sector_id',
  sourceKey: 'fld_id',
  as: 'sectorSeo',
});

Authority.hasOne(AdvanceSeo, {
  foreignKey: 'auth_id',
  sourceKey: 'id',
  as: 'authoritySeo',
});

AdvanceSeo.belongsTo(AppMenuMaster, {
  foreignKey: 'page_id',
  targetKey: 'fld_id',
  as: 'menuItemName',
});

AppMenuMaster.hasOne(AdvanceSeo, {
  foreignKey: 'page_id',
  sourceKey: 'fld_id',
  as: 'pageId',
});

module.exports = {
  MainTender,
  TenderDates,
  TenderEMD,
  TenderFee,
  OtherInfo,
  Country,
  City,
  States,
  Auth,
  Sector,
  Authority,
  SeoSearchMeta,
  AppMenuMaster,
  AdvanceSeo,
  CoverInfo,
  PageContent,
};
