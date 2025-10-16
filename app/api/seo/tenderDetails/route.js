import { NextResponse } from 'next/server';
import { Op } from 'sequelize';
import { AppMenuMaster, SeoSearchMeta } from '@/models/association';

export async function GET(req) {
  const decodeSlug = (name) => {
    return name.replace(/-/g, ' ').replace(/%232/g, '-').trim();
  };

  const { searchParams } = req.nextUrl;

  const Id = searchParams.get('id');
  const slugId = Id ? decodeSlug(Id) : undefined;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const Response = await fetch(
      `${baseUrl}/api/tenders/${slugId}?id=${slugId}`,
    );
    const Record = await Response.json();

    const seoData = await AppMenuMaster.findOne({
      where: {
        menu_name: {
          [Op.like]: 'tender details',
        },
      },
      attributes: ['fld_id', 'menu_name'],
      include: [{ model: SeoSearchMeta, as: 'seoMeta' }],
    });
    const Result = { ...Record[0], seoData };
    if (Result) {
      return NextResponse.json(Result);
    } else {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
