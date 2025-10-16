import { Sector } from '@/models/index';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const sector = await Sector.findAll({
      attributes: ['fld_id', 'sectName'],
    });

    if (!sector) {
      return NextResponse.json({ error: 'No pages found' }, { status: 404 });
    }

    return NextResponse.json(sector, { status: 200 });
  } catch (error) {
    console.error('Error fetching sector:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
