import User from '@/app/models/usermodule';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import {connect} from '@/app/dbconfig/dbconfig';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password, role } = reqBody;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message: "User created successfully.",
            success: true,
            savedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
