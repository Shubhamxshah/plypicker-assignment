import User from '@/app/models/usermodule';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { connect } from '@/app/dbconfig/dbconfig';
import { z } from 'zod';

connect();

// Define the Zod schema for validation
const SignupSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['admin', 'team_member'])
});

export async function POST(request: NextRequest) {
    try {
        // Parse and validate the request body
        const reqBody = await request.json();
        const parsedData = SignupSchema.parse(reqBody);
        const { email, password, role } = parsedData;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create and save the new user
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
        if (error instanceof z.ZodError) {
            // Handle Zod validation errors
            return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
        }
        // Handle other errors
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
}
