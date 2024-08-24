import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import * as jose from 'jose';
import { connect } from '@/app/dbconfig/dbconfig';
import User from '@/app/models/usermodule';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User does not exist' }, { status: 400 });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const token = await new jose.SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    const response = NextResponse.json({
      message: 'Login successful',
      success: true,
      role: user.role
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}