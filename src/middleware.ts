import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const isPublicPage =
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/register';

    // if there no token and the page is not public, redirect to login
    const token = request.cookies.get('token');

    if (!token && !isPublicPage) {
      return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.error();
  }
}

export const config = {
  matcher: ['/', '/login', '/register'],
};
