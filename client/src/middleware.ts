import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This is a client-side auth check placeholder
  // Since Firebase Auth is client-side, actual protection happens in each page component
  // This middleware can be used for additional server-side checks if needed
  
  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/analyze/:path*',
    '/chat/:path*',
    '/settings/:path*',
  ],
};