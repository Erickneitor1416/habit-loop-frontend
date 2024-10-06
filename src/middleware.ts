import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const routes = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ROOT: '/',
  },
  DASHBOARD: '/dashboard',
};

const isPublicRoute = (pathname: string) =>
  pathname === routes.AUTH.LOGIN ||
  pathname === routes.AUTH.REGISTER ||
  pathname === routes.AUTH.ROOT;

const isProtectedRoute = (pathname: string) =>
  pathname.startsWith(routes.DASHBOARD);

export async function middleware(req: NextRequest) {
  const session = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (!session && isProtectedRoute(pathname)) {
    return redirectTo(routes.AUTH.LOGIN, req);
  }

  if (session && isPublicRoute(pathname)) {
    return redirectTo(routes.DASHBOARD, req);
  }

  return NextResponse.next();
}

const redirectTo = (path: string, req: NextRequest) =>
  NextResponse.redirect(new URL(path, req.nextUrl.origin).href);

export const config = {
  matcher: ['/dashboard/:path*', '/auth/register', '/auth/login', '/'],
};
