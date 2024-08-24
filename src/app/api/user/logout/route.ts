import {NextResponse} from 'next/server';

export async function GET(){
    try{
        const request = await NextResponse.json({
            message: 'Logout successful',
            success: true
        })

        request.cookies.set('token', '', {httpOnly: true, expires: new Date(0)});

         return request
    } catch (error) {
        return NextResponse.json({
            message: 'Your request is not complete!'
        })
    }


}