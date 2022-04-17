import { NextRequest, NextResponse } from 'next/server';
import session from '~lib/server/session';

// eslint-disable-next-line import/prefer-default-export
export const middleware = async (req: NextRequest) => {
  const user = await session.getLoginSession(req);
  if (!user) {
    const { origin } = req.nextUrl;
    return NextResponse.redirect(`${origin}`);
  }

  return NextResponse.next();
};
