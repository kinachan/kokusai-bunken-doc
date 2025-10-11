import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/:path*',],
}

export function middleware(req: NextRequest) {
  const {BASIC_AUTH_USER, BASIC_AUTH_PASSWORD} = process.env;

  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = atob(authValue).split(':')

    if (user === BASIC_AUTH_USER && pwd === BASIC_AUTH_PASSWORD) {
      return NextResponse.next()
    }
  }
  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}