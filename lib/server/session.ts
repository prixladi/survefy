import Iron from '@hapi/iron';

import { UserAuthPayload } from '~types';

// eslint-disable-next-line @next/next/no-server-import-in-page
import type { NextRequest } from 'next/server';
import { MAX_AGE, setTokenCookie, getTokenCookie, removeTokenCookie } from './cookies';
import { ApiRequest, ApiResponse } from './types';
import config from './config';

type Session = UserAuthPayload & {
  createdAt: number;
  maxAge: number;
};

const session = {
  setLoginSession: async (res: ApiResponse, sess: UserAuthPayload) => {
    const createdAt = Date.now();
    const obj = { ...sess, createdAt, maxAge: MAX_AGE } as Session;
    const token = await Iron.seal(obj, config.session.secret, Iron.defaults);

    setTokenCookie(res, token);
  },
  destroyLoginSession: async (res: ApiResponse) => {
    removeTokenCookie(res);
  },
  getLoginSession: async (req: ApiRequest | NextRequest) => {
    const token = getTokenCookie(req);
    if (!token) return null;

    const sess = (await Iron.unseal(token, config.session.secret, Iron.defaults)) as Session;
    const expiresAt = sess.createdAt + sess.maxAge * 1000;

    if (Date.now() > expiresAt) {
      return null;
    }

    return sess;
  },
};

export default session;
