import { NextResponse } from 'next/server';
import { Op, Sequelize } from 'sequelize';
import { Authority, MainTender } from '@/models/index';

export async function GET(req) {
  const { searchParams } = req.nextUrl;
  const Limit = parseInt(searchParams.get('limit'));
  try {
    const authidsResult = await MainTender.findAll({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('client_id')), 'client_id'],
      ],
      limit: Limit ? Limit : undefined,
    });
    const authids = authidsResult.map((item) => item.client_id);

    const authorities = await Authority.findAll({
      attributes: ['id', 'name'],
      where: [{ status: '1', id: { [Op.in]: authids } }],
      limit: Limit ? Limit : undefined,
      group: ['id', 'name'],
      order: [['name', 'ASC']],
    });
    return NextResponse.json(authorities, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
