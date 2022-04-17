import joi from 'joi';
import nc from 'next-connect';

import { bootstrap } from '~lib/server';
import auth from '~lib/server/api/auth';
import validation from '~lib/server/api/validation';
import session from '~lib/server/session';
import { ApiRequest, ApiResponse } from '~lib/server/types';
import { UserLoginModel } from '~types';

const router = nc();

const bodySchema = {
  email: joi.string().email().required(),
  password: joi.string().required(),
};

router.post<ApiRequest<UserLoginModel>, ApiResponse>(
  bootstrap({ DB: true }),
  validation({ body: bodySchema }),
  auth.authenticate(),
  async (req, res) => {
    const { user } = req;

    await session.setLoginSession(res, user);

    res.json(req.user);
  },
);

export default router;
