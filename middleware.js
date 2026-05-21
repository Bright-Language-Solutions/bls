// Polite Packers — admin auth middleware.
// Any request to /admin or /admin/* (except /admin/login) must carry a
// cookie `admin_session` whose value equals process.env.ADMIN_SECRET.
// Otherwise we redirect to /admin/login.
//
// Note: middleware runs on the Edge runtime. Keep it dependency-free.

import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Only gate admin routes — leave everything else alone.
  if (!pathname.startsWith('/admin')) return NextResponse.next()

  // The login page itself and the auth API must remain reachable.
  if (pathname.startsWith('/admin/login')) return NextResponse.next()

  const cookie = request.cookies.get('admin_session')?.value
  const secret = process.env.ADMIN_SECRET

  if (!secret || cookie !== secret) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Run on /admin and every nested path. API routes are NOT included here on
  // purpose — they do their own cookie check (see app/api/leads/[id]/route.js).
  matcher: ['/admin', '/admin/:path*'],
}
