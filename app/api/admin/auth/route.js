import { NextResponse } from 'next/server'

const COOKIE_NAME = 'admin_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const secret = process.env.ADMIN_SECRET
  if (!secret || body?.password !== secret) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  res.cookies.set(COOKIE_NAME, secret, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: MAX_AGE,
    secure: process.env.NODE_ENV === 'production',
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ success: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return res
}
