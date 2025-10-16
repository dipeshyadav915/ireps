import { NextResponse } from 'next/server';
import { Authority } from '@/models/index';

export async function GET(req) {
  try {
    const authorities = await Authority.findAll({
      attributes: ['id', 'name'],
    });

    if (!authorities) {
      return NextResponse.json(
        { error: 'No authority found' },
        { status: 404 },
      );
    }

    return NextResponse.json(authorities, { status: 200 });
  } catch (error) {
    console.error('Error fetching authority:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
