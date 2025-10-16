import { NextResponse } from 'next/server';
import { Op, fn, col, where } from 'sequelize';
import {
  AdvanceSeo,
  Authority,
  AppMenuMaster,
  ContentSEO,
} from '@/models/index';
export async function GET(req) {
  const { searchParams } = req.nextUrl;

  const decodeSlug = (name) => {
    return name.replace(/-/g, ' ').replace(/%232/g, '-').trim();
  };

  const Id = searchParams.get('id');
  const slugId = Id ? decodeSlug(Id) : undefined;

  let Result;

  try {
    if (Id) {
      const authRecord = await Authority.findOne({
        where: where(fn('LOWER', col('name')), 'LIKE', slugId),
        attributes: ['id'],
      });
      const authId = authRecord ? authRecord.id : null;

      if (!authId) {
        return NextResponse.json(
          { error: 'Authority not found' },
          { status: 404 },
        );
      }

      Result = await AdvanceSeo.findOne({
        where: {
          selectType: 'auth',
          auth_id: authId,
        },
      });
    } else {
      const menuId = await AppMenuMaster.findOne({
        where: {
          menu_name: {
            [Op.like]: 'Authorities',
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
