import { NextRequest, NextResponse } from 'next/server';

import { getTokenCookie } from '~lib/server/cookies';

// eslint-disable-next-line import/prefer-default-export
export const middleware = async (req: NextRequest) => {
  const cookie = getTokenCookie(req);
  if (!cookie) {
    const { origin } = req.nextUrl;
    return NextResponse.redirect(`${origin}`);
  }

  return NextResponse.next();
};
