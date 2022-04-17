import Iron from '@hapi/iron';

import { UserAuthPayload } from '~types';

import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookies';
import { ApiRequest, ApiResponse } from './types';
import config from './config';

type Session = UserAuthPayload & {
  createdAt: number;
  maxAge: number;
};

export const setLoginSession = async (res: ApiResponse, session: UserAuthPayload) => {
  const createdAt = Date.now();
  const obj = { ...session, createdAt, maxAge: MAX_AGE } as Session;
  const token = await Iron.seal(obj, config.session.secret, Iron.defaults);

  setTokenCookie(res, token);
};

export const getLoginSession = async (req: ApiRequest) => {
  const token = getTokenCookie(req);
  if (!token) return null;

  const session = (await Iron.unseal(token, config.session.secret, Iron.defaults)) as Session;
  const expiresAt = session.createdAt + session.maxAge * 1000;

  if (Date.now() > expiresAt) {
    return null;
  }

  return session;
};
