import { NextResponse } from 'next/server';
import { Op, fn, col, where } from 'sequelize';
import { AdvanceSeo, Sector, ContentSEO, AppMenuMaster } from '@/models/index';
export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const decodeSlug = (name) => {
    return name.replace(/-/g, ' ').replace(/%232/g, '-').trim();
  };

  const Id = searchParams.get('id');
  const slugId = Id ? decodeSlug(Id) : undefined;

  let Result;
  try {
    if (Id) {
      const secRecord = await Sector.findOne({
        where: where(fn('LOWER', col('sectName')), 'LIKE', slugId),
        attributes: ['fld_id'],
      });
      const secId = secRecord ? secRecord.fld_id : null;
      if (!secId) {
        return NextResponse.json(
          { error: 'Sector not found' },
          { status: 404 },
        );
      }

      Result = await AdvanceSeo.findOne({
        where: {
          selectType: 'sector',
          sector_id: secId,
        },
      });
    } else {
      const menuId = await AppMenuMaster.findOne({
        where: {
          menu_name: {
            [Op.like]: 'sectors',
          },
        },
      });
      const pageId = menuId ? menuId.fld_id : null;
      let seoData = null;
      if (pageId) {
        seoData = await ContentSEO.findOne({
          where: {
            page_id: pageId,
          },
        });
      }
      Result = seoData;
    }

    if (Result) {
      return NextResponse.json(Result);
    } else {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
