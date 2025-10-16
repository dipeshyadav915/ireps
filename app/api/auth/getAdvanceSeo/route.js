import { NextResponse } from 'next/server';
import { Op } from 'sequelize';

import { AdvanceSeo, Sector, Authority } from '@/models/association';

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const page = searchParams.get('page');
  const intPage = parseInt(page) || 1;

  const offset = (intPage - 1) * 25;
  try {
    const { rows: metaData, count } = await AdvanceSeo.findAndCountAll({
      where: {
        [Op.or]: [
          { auth_id: { [Op.ne]: null, [Op.ne]: 0 } },
          { sector_id: { [Op.ne]: null, [Op.ne]: 0 } },
        ],
      },

      attributes: [
        'fld_id',
        'page_title',
        'selectType',
        'meta_key',
        'meta_desc',
        'header_content',
        'content',
        'page_id',
        'sector_id',
        'auth_id',
      ],

      limit: 50,
      offset: offset,

      include: [
        {
          model: Sector,
          attributes: ['fld_id', 'sectName'],
          as: 'sector',
          required: false,
        },
        {
          model: Authority,
          attributes: ['id', 'name'],
          as: 'authority',
          required: false,
        },
      ],
    });

    if (!metaData) {
      return NextResponse.json({ error: 'No pages found' }, { status: 404 });
    }

    return NextResponse.json({ metaData, count }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
