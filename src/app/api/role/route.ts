// app/api/role/route.ts

import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const { payload } = await jose.jwtVerify(token, secret);

    // Return the user role
    return NextResponse.json({ role: payload.role });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}