import { serialize, parse } from 'cookie';

import { ApiResponse } from './types';

export type CookieRequest =
  | {
      cookies: Record<string, string>;
    }
  | {
      headers: {
        cookie: string | undefined;
      };
    };

const TOKEN_NAME = '_sub';

export const MAX_AGE = 60 * 60 * 24 * 365 * 10; // 10 years

export const setTokenCookie = (res: ApiResponse, token: string) => {
  const cookie = serialize(TOKEN_NAME, token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });

  res.setHeader('Set-Cookie', cookie);
};

export const removeTokenCookie = (res: ApiResponse) => {
  const cookie = serialize(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  res.setHeader('Set-Cookie', cookie);
};

export const parseCookies = (req: CookieRequest) => {
  if ('cookies' in req && req.cookies) return req.cookies;

  const cookie = 'headers' in req && req.headers?.cookie;
  return parse(cookie || '');
};

export const getTokenCookie = (req: CookieRequest) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};
