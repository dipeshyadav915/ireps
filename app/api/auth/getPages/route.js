import { NextResponse } from 'next/server';
import { AppMenuMaster } from '@/models/index';

export async function GET() {
  try {
    const pages = await AppMenuMaster.findAll({
      attributes: ['fld_id', 'menu_name'],
    });

    if (!pages) {
      return NextResponse.json({ error: 'No pages found' }, { status: 404 });
    }

    return NextResponse.json(pages, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
