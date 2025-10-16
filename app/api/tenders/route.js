import { NextResponse } from 'next/server';

import { Op, fn, col, where } from 'sequelize';

import {
  MainTender,
  TenderDates,
  City,
  States,
  Country,
} from '@/models/association';
import { Authority, Sector } from '@/models/index';

export async function GET(req) {
  const { searchParams } = req.nextUrl;

  const decodeSlug = (name) => {
    return name.replace(/-/g, ' ').replace(/%232/g, '-').trim();
  };

  const page = searchParams.get('page');
  const pageSize = searchParams.get('pagesize');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const sec = searchParams.get('sec');
  const auth = searchParams.get('auth');

  const searchWords = search && search.split(/\s+/);

  const intPage = parseInt(page);
  const intPageSize = parseInt(pageSize);

  const offset = (intPage - 1) * intPageSize;

  const slugId = sec ? decodeSlug(sec) : auth ? decodeSlug(auth) : undefined;

  try {
    let authId;
    let secId;

    if (auth) {
      const authRecord = await Authority.findOne({
        where: where(fn('LOWER', col('name')), 'LIKE', slugId),
        attributes: ['id'],
      });

      authId = authRecord ? authRecord.id : null;
    }

    if (sec) {
      const secRecord = await Sector.findOne({
        where: where(fn('LOWER', col('sectName')), 'LIKE', slugId),
        attributes: ['fld_id'],
      });

      secId = secRecord ? secRecord.fld_id : null;
    }

    const { rows: tender, count } = await MainTender.findAndCountAll({
      limit: intPageSize,
      offset: offset,

      include: [
        {
          model: TenderDates,
          as: 'dates',
          attributes: ['tnd_published_date'],
        },
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
      // order: ,

      where: {
        ...(sec
          ? secId === null
            ? { fld_id: { [Op.eq]: null } }
            : {
                [Op.or]: [
                  { sector_ids: { [Op.like]: `%,${secId},%` } },
                  { sector_ids: { [Op.like]: `${secId},%` } },
                  { sector_ids: { [Op.like]: `%,${secId}` } },
                  { sector_ids: secId },
                ],
              }
          : undefined),

        ...(search
          ? {
              [Op.or]: [
                { tender_details: { [Op.like]: `%${search}%` } },

                ...searchWords.map((word) => ({
                  tender_details: { [Op.like]: `%${word}%` },
                })),
              ],
            }
          : undefined),
        ...(auth
          ? authId === null
            ? { id: { [Op.eq]: null } }
            : { client_id: authId }
          : undefined),
      },

      order:
        sort === 'value'
          ? [['tender_amnt_val', 'DESC']]
          : sort === 'emd value'
            ? [['tender_emd_amnt_val', 'DESC']]
            : sort === 'published date'
              ? [['dates', 'tnd_published_date', 'DESC']]
              : [['entry_date', 'DESC']],
    });

    return NextResponse.json({ tender, count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
