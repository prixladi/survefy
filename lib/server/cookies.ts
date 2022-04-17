import { serialize, parse } from 'cookie';
import { ApiRequest, ApiResponse } from './types';

const TOKEN_NAME = 'token';

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

export const parseCookies = (req: ApiRequest) => {
  if (req.cookies) return req.cookies;

  const cookie = req.headers?.cookie;
  return parse(cookie || '');
};

export const getTokenCookie = (req: ApiRequest) => {
  const cookies = parseCookies(req);
  return cookies[TOKEN_NAME];
};
