import { NextResponse } from 'next/server';
import { AboutSection } from '@/models/index';

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const userRole = req.headers.get('user-role');
  try {
    let response;
    if (userRole === 'admin') {
      response = await AboutSection.findAll();
    } else {
      const url = searchParams.get('url');
      const responseData = await AboutSection.findAll({
        where: {
          status: 1,
          url: url,
        },
      });
      const responseObject = {};

      responseData.forEach(({ slug, content }) => {
        responseObject[slug] = content;
      });

      response = responseObject;
    }
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('error', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
