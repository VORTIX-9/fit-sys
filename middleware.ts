import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of roles that can access admin routes
const ADMIN_ROLES = ['OWNER', 'MANAGER', 'STAFF'];

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // 1. Define excluded paths (api, static files, etc.)
    const isInternal = url.pathname.startsWith('/_next') ||
        url.pathname.startsWith('/api') ||
        url.pathname.includes('.');

    if (isInternal) return NextResponse.next();

    // 2. Subdomain detection logic
    const host = hostname.split(':')[0];
    const parts = host.split('.');

    let slug = '';
    if (parts.length > 1 && !host.includes('localhost')) {
        slug = parts[0];
    } else if (parts.length === 2 && host.includes('localhost')) {
        slug = parts[0];
    }

    // 3. Main Landing Page Handling
    if (!slug || slug === 'www' || slug === 'fit') {
        return NextResponse.next();
    }

    // 4. Session & Route Protection Logic (Mock)
    const sessionToken = request.cookies.get('fit_session')?.value;
    const isAppRoot = url.pathname.startsWith('/app');
    const isAdminRoute = url.pathname.startsWith('/app/admin');
    const isLoginPath = url.pathname === '/login';

    // 5. Auth Logic Mock
    if (isAppRoot && !isLoginPath) {
        if (!sessionToken) {
            // No session -> Redirect to tenant login
            // return NextResponse.redirect(new URL('/login', request.url));
        }

        // Simulating role check from JWT
        // if (isAdminRoute && !ADMIN_ROLES.includes(userRole)) {
        //    return NextResponse.redirect(new URL('/app/member', request.url));
        // }
    }

    // 6. Rewrite to Tenant Segment
    const response = NextResponse.rewrite(new URL(`/${slug}${url.pathname}`, request.url));
    response.headers.set('x-tenant-slug', slug);

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
