import joi from 'joi';
import nc from 'next-connect';

import { bootstrap } from '~lib/server';
import auth from '~lib/server/api/auth';
import validation from '~lib/server/api/validation';
import { setLoginSession } from '~lib/server/auth';
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
    const session = req.user;

    await setLoginSession(res, session);

    res.json(req.user);
  },
);

export default router;
