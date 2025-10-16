import { NextResponse } from 'next/server';
import { MainTender } from '@/models/association';
import { Op, Sequelize } from 'sequelize';
import moment from 'moment/moment';

export async function GET() {
  try {
    // const moment = require('moment-timezone');
    const timeZone = 'Asia/Kolkata';
    const startOfDay = moment()
      .tz(timeZone)
      .startOf('day')
      .format('YYYY-MM-DD HH:mm:ss');
    const endOfDay = moment()
      .tz(timeZone)
      .endOf('day')
      .format('YYYY-MM-DD HH:mm:ss');

    const { count, rows } = await MainTender.findAndCountAll({
      where: {
        entry_date: {
          [Op.between]: [
            Sequelize.literal(`'${startOfDay}'`),
            Sequelize.literal(`'${endOfDay}'`),
          ],
        },
      },
    });

    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    console.error('Error fetching projects:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
