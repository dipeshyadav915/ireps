import { Admin } from '@/models/index';
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import jwt from 'jsonwebtoken';
export async function POST(req) {
  const SECRET_KEY = process.env.JWT_SECRET;
  const body = await req.json();
  try {
    const admin = await Admin.findOne({
      where: {
        email: body.email,
      },
    });
    if (!admin) {
      return NextResponse.json({ error: 'Email Not Found' }, { status: 404 });
    }
    const hashedPassword = createHash('md5')
      .update(body.password)
      .digest('hex');
    if (hashedPassword === admin.password) {
      const token = jwt.sign({ id: admin.emp_id }, SECRET_KEY, {
        expiresIn: '1d',
      });

      return NextResponse.json(
        { message: 'login successful', token: token },
        {
          status: 200,
        },
      );
    }
    return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
