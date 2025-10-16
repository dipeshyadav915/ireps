import { NextResponse } from 'next/server';
import {
  MainTender,
  CoverInfo,
  TenderDates,
  TenderEmd,
  TenderFee,
  TenderOtherInfo,
  TenderDocs,
  TenderSectors,
  ArchiveMainTender,
  ArchiveTenderSectors,
  ArchiveTenderDocs,
} from '@/models/index';

async function fetchTender(date) {
  const url =
    'https://api.growthgrids.com/bd_growthgrids/index.php/tender_type_ireps';

  const formData = new FormData();
  formData.append('dates', date);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data from GrowthGrids API');
    }

    const result = await response.json();
    if (result.data == null) throw new Error('No tender data received');
    return result.data;
  } catch (err) {
    'Error:', err.message;
    return null;
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const date =
    searchParams.get('date') || new Date().toISOString().split('T')[0];

  const data = await fetchTender(date);

  if (!data)
    return NextResponse.json(
      { message: 'No tenders found', status: 404 },
      { status: 404 },
    );
  try {
    for (const tenderData of data) {
      const ifExistLive = await MainTender.findOne({
        where: {
          fld_id: tenderData.fld_id,
        },
      });

      if (!ifExistLive) {
        await MainTender.create({
          fld_id: tenderData.fld_id,
          gg_tender_id: tenderData.gg_tender_id,
          website_id: tenderData.website_id,
          tnd_ref_id: tenderData.tnd_ref_id,
          tender_details: tenderData.tender_details,
          tender_gov_id: tenderData.tender_gov_id,
          tnd_title: tenderData.tnd_title,
          tender_amnt_val: tenderData.tender_amnt_val,
          tender_emd_amnt_val: tenderData.tender_emd_amnt_val,
          currency_id: tenderData.currency_id,
          client_id: tenderData.client_id,
          client_country_id: tenderData.client_country_id,
          client_state_id: tenderData.client_state_id,
          client_city_id: tenderData.client_city_id,
          sector_ids: tenderData.sector_ids,
          submission_start_date: tenderData.submission_start_date,
          submission_end_date: tenderData.submission_end_date,
          tnd_update: tenderData.tnd_update,
          is_update: tenderData.is_update,
          corr_last_update: tenderData.corr_last_update,
          is_doc_avl: tenderData.is_doc_avl,
          status: tenderData.status,
          entry_date: tenderData.entry_date,
          entry_by: tenderData.entry_by,
          modified_by: tenderData.modified_by,
          modified_date: tenderData.modified_data,
        });

        await TenderOtherInfo.update(
          {
            rz_tender_id: tenderData.other_rz_tender_id,
            product_category_id: tenderData.other_product_category_id,
            form_of_contract: tenderData.other_form_of_contract,
            no_of_covers: tenderData.other_no_of_covers,
            payment_mode: tenderData.other_payment_mode,
            general_technical_evaluation_allowed:
              tenderData.other_general_technical_evaluation_allowed,
            item_wise_technical_value:
              tenderData.other_item_wise_technical_value,
            is_multicurrency_allowed_for_boq:
              tenderData.other_is_multicurrency_allowed_for_boq,
            is_multicurrency_allowed_for_fee:
              tenderData.other_is_multicurrency_allowed_for_fee,
            allowed_two_stage_bidding:
              tenderData.other_allowed_two_stage_bidding,
            nda_pre_qualification: tenderData.other_nda_pre_qualification,
            independent_external_monitor_remark:
              tenderData.other_independent_external_monitor_remark,
            contract_type: tenderData.other_contract_type,
            bid_validity: tenderData.other_bid_validity,
            period_of_work: tenderData.other_period_of_work,
            region_code: tenderData.other_region_code,
            pre_bid_meeting_place: tenderData.other_pre_bid_meeting_place,
            pre_bid_meeting_address: tenderData.other_pre_bid_meeting_address,
            pre_bid_meeting_date: tenderData.other_pre_bid_meeting_date,
            pre_bid_meeting_time: tenderData.other_pre_bid_meeting_time,
            bid_opening_place: tenderData.other_bid_opening_place,
            should_allow_nda_tnd: tenderData.other_should_allow_nda_tnd,
            allow_preferential_bidder:
              tenderData.other_allow_preferential_bidder,
            number_of_cover: tenderData.other_number_of_cover,
            instrument_type: tenderData.other_instrument_type,
            withdrawal_allowed: tenderData.other_withdrawal_allowed,
            tnd_status: tenderData.other_tnd_status,
            pincode: tenderData.other_pincode,
            email_id: tenderData.other_email_id,
            phone_no: tenderData.other_phone_no,
            tnd_type: tenderData.other_tnd_type,
            tnd_category_id: tenderData.other_tnd_category_id,
            tnd_sub_category_id: tenderData.other_tnd_sub_category_id,
            funding_agency_id: tenderData.other_funding_agency_id,
            client_cont_person: tenderData.other_client_cont_person,
            client_cont_address: tenderData.other_client_cont_address,
            org_id: tenderData.other_org_id,
            dep_id: tenderData.other_dep_id,
            div_id: tenderData.other_div_id,
            subdiv_id: tenderData.other_subdiv_id,
            branch_id: tenderData.other_branch_id,
            status: tenderData.other_status,
            entry_date: tenderData.other_entry_date,
            modified_by: tenderData.other_modified_by,
            modified_date: tenderData.other_modified_date,
          },
          {
            where: {
              tg_main_tender_id: tenderData.fld_id,
            },
          },
        );

        await CoverInfo.update(
          {
            cover_type: tenderData.coverIn_cover_type,
            description: tenderData.coverIn_description,
            doc_type: tenderData.coverIn_doc_type,
            status: tenderData.coverIn_status,
            entry_date: tenderData.coverIn_entry_date,
            modified_by: tenderData.coverIn_modified_by,
            modified_date: tenderData.coverIn_modified_date,
          },
          {
            where: {
              tg_main_tender_id: tenderData.fld_id,
            },
          },
        );

        await TenderDates.update(
          {
            tnd_published_date: tenderData.date_tnd_published_date,
            tnd_published_time: tenderData.date_tnd_published_time,
            bid_opening_date: tenderData.date_bid_opening_date,
            bid_opening_time: tenderData.date_bid_opening_time,
            doc_download_start_date: tenderData.date_doc_download_start_date,
            doc_download_start_time: tenderData.date_doc_download_start_time,
            doc_download_end_date: tenderData.date_doc_download_end_date,
            doc_download_end_time: tenderData.date_doc_download_end_time,
            clarification_start_date: tenderData.date_clarification_start_date,
            clarification_start_time: tenderData.date_clarification_start_time,
            clarification_end_date: tenderData.date_clarification_end_date,
            clarification_end_time: tenderData.date_clarification_end_time,
            submission_start_time: tenderData.date_submission_start_time,
            submission_end_time: tenderData.date_submission_end_time,
            status: tenderData.date_status,
            entry_date: tenderData.date_entry_date,
            updated_date: tenderData.date_updated_date,
            updated_by: tenderData.date_updated_by,
          },
          {
            where: {
              tg_main_tender_id: tenderData.fld_id,
            },
          },
        );

        await TenderFee.update(
          {
            tnd_fee: tenderData.feeIn_tnd_fee,
            processing_fee: tenderData.feeIn_processing_fee,
            //fee_payable_to: tenderData.feeIn_fee_payable_to,
            fee_payable_at: tenderData.feeIn_fee_payable_at,
            tnd_fee_exemption_allowed:
              tenderData.feeIn_tnd_fee_exemption_allowed,
            status: tenderData.feeIn_status,
            entry_date: tenderData.feeIn_entry_date,
            modified_by: tenderData.feeIn_modified_by,
            modified_date: tenderData.feeIn_modified_date,
          },
          {
            where: {
              tg_main_tender_id: tenderData.fld_id,
            },
          },
        );

        await TenderEmd.update(
          {
            emd_amount: tenderData.temd_emd_amount,
            emd_fee_type: tenderData.temd_emd_fee_type,
            emd_payable_to: tenderData.temd_emd_payable_to,
            emd_payable_at: tenderData.temd_emd_payable_at,
            emd_percentage: tenderData.temd_emd_percentage,
            emd_through_BG_ST_orEMD_exemption_allowed:
              tenderData.temd_emd_through_BG_ST_orEMD_exemption_allowed,
            status: tenderData.temd_status,
            entry_date: tenderData.temd_entry_date,
            updated_by: tenderData.temd_updated_by,
            updated_date: tenderData.temd_updated_date,
          },
          {
            where: {
              tg_main_tender_id: tenderData.fld_id,
            },
          },
        );

        if (tenderData.documents?.length) {
          const formattedDocs = tenderData.documents.map(
            ({ fld_id, ...validData }) => validData,
          );
          await TenderDocs.bulkCreate(formattedDocs);
        }

        if (tenderData.sectors?.length) {
          const formattedSectors = tenderData.sectors.map(
            ({ fld_id, sectName, ...validData }) => validData,
          );
          await TenderSectors.bulkCreate(formattedSectors);
        }

        // Check if tender exists in MainTender and delete it
        const archiveTender = await ArchiveMainTender.findOne({
          where: { fld_id: tenderData.fld_id },
        });

        if (archiveTender) {
          await ArchiveMainTender.destroy({
            where: { fld_id: tenderData.fld_id },
          });

          await ArchiveTenderSectors.destroy({
            where: { tg_main_tender_id: tenderData.fld_id },
          });

          await ArchiveTenderDocs.destroy({
            where: { tg_main_tender_id: tenderData.fld_id },
          });
        }
      }
    }
    return NextResponse.json({ message: 'Data Updated' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
