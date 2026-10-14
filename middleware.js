// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request) {
  try {
    const token = request.cookies.get('token')?.value;
    if (!token) throw new Error('No token');
    
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    
    // Role validation
    if (request.nextUrl.pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Only guard private areas; public pages must stay crawlable and fast
export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};