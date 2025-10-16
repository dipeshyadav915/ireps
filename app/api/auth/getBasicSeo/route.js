import { NextResponse } from 'next/server';
import { SeoSearchMeta, AppMenuMaster } from '@/models/association';

export async function GET() {
  try {
    const { count, rows } = await SeoSearchMeta.findAndCountAll({
      attributes: ['fld_id', 'page_title', 'meta_key', 'meta_desc', 'page_id'],
      include: [
        {
          model: AppMenuMaster,
          attributes: ['fld_id', 'menu_name'],
          as: 'menuMaster',
        },
      ],
    });

    return NextResponse.json({ count, rows }, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
