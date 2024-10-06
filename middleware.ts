import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};

export default withAuth(
  async function middleware(req: NextRequest) {
    const url = req.nextUrl;

    // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
    let hostname = req.headers
      .get('host')!
      .replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

    // Special case for Vercel preview deployment URLs
    if (
      hostname.includes('---') &&
      hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
    ) {
      hostname = `${hostname.split('---')[0]}.${
        process.env.NEXT_PUBLIC_ROOT_DOMAIN
      }`;
    }

    const searchParams = req.nextUrl.searchParams.toString();
    const path = `${url.pathname}${
      searchParams.length > 0 ? `?${searchParams}` : ''
    }`;

    // Handle KindeAuth session validation
    const { getUser, isAuthenticated } = await getKindeServerSession();
    const authenticated = await isAuthenticated();
    const user = getUser();

    // Handle multi-tenant app subdomain
    if (hostname === `app.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) {
      if (!authenticated && path !== '/api/auth/login') {
        return NextResponse.redirect(new URL('/api/auth/login', req.url));
      } else if (authenticated && path === '/api/auth/login') {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return NextResponse.rewrite(
        new URL(`/app${path === '/' ? '' : path}`, req.url)
      );
    }

    // Special case for vercel.pub
    if (hostname === 'vercel.pub') {
      return NextResponse.redirect(
        'https://vercel.com/blog/platforms-starter-kit'
      );
    }

    // Rewrite root app to /home folder for main domain or localhost
    if (
      hostname === 'localhost:3000' ||
      hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
    ) {
      return NextResponse.rewrite(
        new URL(`/home${path === '/' ? '' : path}`, req.url)
      );
    }

    // Rewrite all other subdomains to dynamic route /[domain]/[slug]
    return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
  },
  {
    callbacks: {
      async authorized() {
        // Always return true to allow access to authorized pages
        return true;
      },
    },
  }
);
