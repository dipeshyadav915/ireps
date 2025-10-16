// app/api/auth/verify/route.js
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { token } = await req.json();

    const SECRET_KEY = process.env.JWT_SECRET;
    if (!SECRET_KEY) {
      return NextResponse.json(
        { error: 'Secret key is not defined!' },
        { status: 500 },
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ valid: true, decoded }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: error.message },
      { status: 401 },
    );
  }
}
