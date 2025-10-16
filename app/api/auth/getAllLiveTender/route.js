import { NextResponse } from 'next/server';
import { Op, fn, col, Sequelize } from 'sequelize';
import { MainTender } from '@/models/association';

export async function POST(req) {
  const { searchParams } = req.nextUrl;
  const body = await req.json();

  const page = body.page;
  const pageSize = body.pageSize || 20;
  const startDate = body.startDate;
  const endDate = body.endDate;
  const search = searchParams.get('search');
  const searchWords = search && search.trim().split(/\s+/);

  const offset = (page - 1) * pageSize;
  try {
    if (startDate && endDate) {
      const { rows: tender, count } = await MainTender.findAndCountAll({
        limit: pageSize,
        offset: offset,

        where: {
          ...(startDate !== endDate
            ? {
                entry_date: { [Op.between]: [startDate, endDate] },
              }
            : {
                entry_date: {
                  [Op.and]: [
                    Sequelize.where(
                      Sequelize.fn('DATE', Sequelize.col('entry_date')),
                      startDate,
                    ),
                  ],
                },
              }),

          ...(search
            ? {
                [Op.or]: [
                  { tender_details: { [Op.eq]: `%${search}%` } },

                  ...searchWords.map((word) => ({
                    tender_details: { [Op.like]: `%${word}%` },
                  })),
                ],
              }
            : undefined),
        },
      });
      return NextResponse.json({ tender, count }, { status: 200 });
    } else {
      const { rows: tender, count } = await MainTender.findAndCountAll({
        limit: pageSize,
        offset: offset,

        where: {
          ...(search
            ? {
                [Op.or]: [
                  { tender_details: { [Op.like]: `%${search}%` } },

                  ...searchWords.map((word) => ({
                    tender_details: { [Op.like]: `%${word}%` },
                  })),
                ],
              }
            : undefined),
        },
      });
      return NextResponse.json({ tender, count }, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching projects:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
