import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  console.log('Token: ', token);

  if (!token) {
    console.log('No token found, redirecting to /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
    const { payload } = await jose.jwtVerify(token, secret);
    console.log('Decoded token:', payload);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('user', JSON.stringify(payload));

    // Check role based on URL
    if (request.nextUrl.pathname.startsWith('/pending-requests')) {
      if (payload.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', request.url));
      }
    }

    if (request.nextUrl.pathname === '/profile/my-submissions' && payload.role !== 'team_member') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/dashboard',
    '/dashboard/:path*',
    '/api/protected/:path*',
    '/pending-requests',
    '/pending-requests/:path*',
    '/profile',
    '/profile/:path*',
  ],
};