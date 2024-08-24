import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import * as jose from 'jose';
import { connect } from '@/app/dbconfig/dbconfig';
import User from '@/app/models/usermodule';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password, role } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await newUser.save();

    const tokenData = {
      id: savedUser._id,
      email: savedUser.email,
      role: savedUser.role
    };

    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
    const token = await new jose.SignJWT(tokenData)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    const response = NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}