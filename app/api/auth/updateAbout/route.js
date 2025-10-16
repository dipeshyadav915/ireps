import { NextResponse } from 'next/server';
import { AboutSection } from '@/models/index';
export async function POST(req) {
  try {
    const body = await req.json();

    const response = await AboutSection.update(
      {
        title: body.title || undefined,
        content: body.content || undefined,
        status: body.status || undefined,
      },
      {
        where: {
          id: body.fld_id,
        },
      },
    );

    return NextResponse.json(
      { message: 'Record Update Successfully', data: response },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
