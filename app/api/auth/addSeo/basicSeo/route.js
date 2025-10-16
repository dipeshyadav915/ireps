import { SeoSearchMeta } from '@/models/index';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  try {
    const [seoData, created] = await SeoSearchMeta.upsert({
      page_id: body.page,
      page_title: body.metaTitle,
      meta_key: body.metaKey,
      meta_desc: body.metaDescription,
    });
    if (!seoData) {
      return NextResponse.json(
        { error: 'SEO Data Not Saved' },
        { status: 500 },
      );
    }
    const message = created
      ? 'SEO Data Inserted Successfully'
      : 'SEO Data Updated Successfully';

    return NextResponse.json({ message, data: seoData }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
