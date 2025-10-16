import { NextResponse } from 'next/server';
import { ContactQuery } from '@/models/index';

export async function POST(req) {
  const body = await req.json();
  const page = body.page;
  const pageSize = body.pageSize;

  const offset = (page - 1) * pageSize;
  try {
    const { count, rows } = await ContactQuery.findAndCountAll({
      limit: pageSize,
      offset: offset,
      where: {
        status: 1,
      },
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
