import { NextRequest, NextResponse } from 'next/server';
import pages from '~lib/pages';

import { getTokenCookie } from '~lib/server/cookies';

// eslint-disable-next-line import/prefer-default-export
export const middleware = async (req: NextRequest) => {
  const cookie = getTokenCookie(req);
  if (cookie && !req.nextUrl.pathname.includes('signout')) {
    const { origin } = req.nextUrl;
    return NextResponse.redirect(`${origin}${pages.dashboard}`);
  }

  return NextResponse.next();
};
