export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { Op } from 'sequelize';
import { AppMenuMaster, SeoSearchMeta } from '@/models/association';

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: 'types not found' }, { status: 400 });
  }

  try {
    const Result = await AppMenuMaster.findOne({
      where: {
        menu_name: {
          [Op.like]: type,
        },
      },
      attributes: ['fld_id', 'menu_name'],
      include: [{ model: SeoSearchMeta, as: 'seoMeta' }],
    });

    if (!Result) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    return NextResponse.json(Result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
