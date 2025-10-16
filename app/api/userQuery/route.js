import { NextResponse } from 'next/server';
import { UserQuery } from '@/models/index';

export async function POST(req) {
  try {
    const body = await req.json();
    const query = await UserQuery.create(body);

    return NextResponse.json(query, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
