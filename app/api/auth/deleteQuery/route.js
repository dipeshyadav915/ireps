import { NextResponse } from 'next/server';
import { ContactQuery } from '@/models/index';
export async function POST(req) {
  try {
    const formdata = await req.formData();
    const queryId = formdata.get('queryId');

    const admin = await ContactQuery.destroy({
      where: {
        fld_id: queryId,
      },
    });

    return NextResponse.json(
      { message: 'Record Delete Successfully' },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
