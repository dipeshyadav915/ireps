import { AdvanceSeo } from '@/models/index';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const body = await req.json();

  try {
    const data = await AdvanceSeo.findOne({
      where: {
        [body.pageType === 'sector' ? 'sector_id' : 'auth_id']:
          body.pageType === 'sector' ? body.sector_id : body.auth_id,
      },
      attributes: ['fld_id'],
    });

    if (data && data.length != 0) {
      const seoData = await AdvanceSeo.update(
        {
          page_id: body.page,
          selectType: body.pageType,
          page_title: body.metaTitle,
          meta_key: body.metaKey,
          meta_desc: body.metaDescription,
          header_content: body.headerContent,
          content: body.headerContent,
        },
        {
          where: {
            [body.pageType === 'sector' ? 'sector_id' : 'auth_id']:
              body.pageType === 'sector' ? body.sector_id : body.auth_id,
          },
        },
      );

      return NextResponse.json(
        { message: 'SEO data updated successfully', data: seoData },
        { status: 200 },
      );
    } else {
      const seoData = await AdvanceSeo.create({
        page_id: body.page,
        selectType: body.pageType,
        page_title: body.metaTitle,
        meta_key: body.metaKey,
        meta_desc: body.metaDescription,
        header_content: body.headerContent,
        content: body.headerContent,
        [body.pageType === 'sector' ? 'sector_id' : 'auth_id']:
          body.pageType === 'sector' ? body.sector_id : body.auth_id,
      });

      return NextResponse.json(
        { message: 'SEO data inserted successfully', data: seoData },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
