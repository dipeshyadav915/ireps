import { NextResponse } from 'next/server';
// import { Sequelize } from 'sequelize';

import {
  MainTender,
  TenderDates,
  TenderEMD,
  TenderFee,
  OtherInfo,
  Country,
  City,
  States,
  Auth,
} from '@/models/association';

export async function GET(req, { params }) {
  const { tenderId } = await params;

  try {
    const tender = await MainTender.findAll({
      where: { fld_id: tenderId },
      attributes: [
        'fld_id',
        'gg_tender_id',
        'tender_details',
        'tnd_title',
        'tender_amnt_val',
        'client_id',
        'sector_ids',
        'client_country_id',
        'client_state_id',
        'client_city_id',
        'submission_start_date',
        'submission_end_date',
        'currency_id',
        'tender_emd_amnt_val',
      ],
      include: [
        {
          model: TenderDates,
          as: 'dates',
          attributes: [
            'critical_dates_id',
            'tnd_published_date',
            'tnd_published_date',
          ],
        },
        { model: TenderEMD, as: 'emd', attributes: ['emd_id', 'emd_amount'] },
        { model: TenderFee, as: 'fees', attributes: ['fee_id', 'tnd_fee'] },

        {
          model: OtherInfo,
          as: 'otherInfo',
          attributes: ['fld_id', 'tnd_type'],
        },
        { model: Auth, as: 'auth', attributes: ['id', 'name'] },
        {
          model: City,
          as: 'city',
          attributes: ['city_id', 'city_name'],
        },
        {
          model: States,
          as: 'states',
          attributes: ['state_id', 'state_name'],
        },
        {
          model: Country,
          as: 'country',
          attributes: ['country_id', 'country_name'],
        },
      ],
    });

    return NextResponse.json(tender, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
