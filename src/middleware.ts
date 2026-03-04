/**
 * Middleware for Portal Authentication
 * Redirects unauthenticated users to login
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing portal pages
  if (pathname.startsWith('/portal')) {
    // Get session cookie
    const sessionCookie = request.cookies.get('customer_session');

    // If no session and not on login page, redirect to login
    if (!sessionCookie && pathname !== '/portal/login') {
      return NextResponse.redirect(new URL('/portal/login', request.url));
    }

    // If has session and on login page, redirect to dashboard
    if (sessionCookie && pathname === '/portal/login') {
      return NextResponse.redirect(new URL('/portal', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/portal/:path*',
};
