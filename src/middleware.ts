import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Custom middleware function
export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Check if there is a token and if the request path is for sign-in, sign-up, or verify pages
    if (token && (
        url.pathname.startsWith('/sign-in') ||
        url.pathname.startsWith('/sign-up') ||
        url.pathname.startsWith('/verify')
    )) {
        // Redirect authenticated users away from sign-in, sign-up, or verify pages
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect unauthenticated users trying to access protected pages to the home page
    if (!token && (
        url.pathname.startsWith('/dashboard')
         
    )) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // If no special conditions are met, continue as normal
    return NextResponse.next();
}

// Middleware configuration
export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/verify',
        '/dashboard/:path*',
        '/' // Include any other pages where middleware should apply
    ]
};
