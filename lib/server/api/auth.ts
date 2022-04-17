import { NextHandler } from 'next-connect';
import passport from 'passport';
import { Strategy } from 'passport-local';

import session from '../session';
import { User } from '../models';
import { ApiRequest, ApiResponse } from '../types';

type ProtectOptions = {
  allowUnauthenticated?: boolean;
};

passport.use(
  new Strategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (_, email, password, done) => {
      let user: User | null = null;
      try {
        user = await User.findOne({ email: User.normalizeEmail(email) });
      } catch (err) {
        console.error(err);
      }

      if (user && (await user.validatePassword(password))) {
        return done(null, {
          id: user._id.toString(),
          email: user.email,
        });
      }

      return done(null, null);
    },
  ),
);

const auth = {
  authenticate: () => passport.authenticate('local', { session: false }),
  protect:
    ({ allowUnauthenticated }: ProtectOptions) =>
    async (req: ApiRequest, res: ApiResponse, next: NextHandler) => {
      const user = await session.getLoginSession(req);
      if (user) req.user = user;

      if (allowUnauthenticated || req.user) {
        next();
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    },
};

export default auth;
