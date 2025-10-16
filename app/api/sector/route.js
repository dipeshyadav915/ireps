import { NextResponse } from 'next/server';
import { Op } from 'sequelize';
import { Sector, MainTender } from '@/models/index';

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const Limit = parseInt(searchParams.get('limit'));
  try {
    const idsResult = await MainTender.findAll({
      attributes: ['sector_ids'],
      where: {
        sector_ids: { [Op.ne]: null },
      },
      // limit: Limit ? Limit : undefined,
    });
    const sectorIds = [
      ...new Set(
        idsResult
          .map((row) => row.sector_ids) // Get 'sector_ids' values
          .filter(Boolean) // Remove null or undefined values
          .flatMap((ids) => ids.split(',')) // Split comma-separated values and flatten the array
          .map((id) => id.trim()), // Remove any extra spaces
      ),
    ];
    const ids = sectorIds.map((item) => item);

    const sectors = await Sector.findAll({
      attributes: ['fld_id', 'parent_id', 'sectName', 'is_active'],
      where: {
        fld_id: {
          [Op.in]: ids,
        },
      },
      limit: Limit ? Limit : undefined,
      order: [['sectName', 'ASC']],
    });

    return NextResponse.json(sectors, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
