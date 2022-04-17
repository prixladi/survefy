import { NextRequest, NextResponse } from 'next/server';

/* eslint-disable-next-line */
export function middleware(req: NextRequest) {
  if (req.cookies.token) {
    const { origin } = req.nextUrl;
    return NextResponse.redirect(`${origin}/dashboard`);
  }

  return NextResponse.next();
}
