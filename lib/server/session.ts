import Iron from '@hapi/iron';

import { UserAuthPayload } from '~types';

import {
  MAX_AGE,
  setTokenCookie,
  getTokenCookie,
  removeTokenCookie,
  CookieRequest,
} from './cookies';
import { ApiResponse } from './types';
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
  getLoginSession: async (req: CookieRequest) => {
    const token = getTokenCookie(req);
    if (!token || !token.startsWith(Iron.macPrefix)) return null;

    let sess: Session;
    try {
      sess = await Iron.unseal(token, config.session.secret, Iron.defaults);
    } catch (err: any) {
      if (err.message === 'Bad hmac value') return null;
      throw err;
    }
    const expiresAt = sess.createdAt + sess.maxAge * 1000;

    if (Date.now() > expiresAt) {
      return null;
    }

    return sess;
  },
};

export default session;
