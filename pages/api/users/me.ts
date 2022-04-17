import nc from 'next-connect';

import auth from '~lib/server/api/auth';
import { ApiRequest, ApiResponse } from '~lib/server/types';
import { UserLoginModel } from '~types';

const router = nc();

router.get<ApiRequest<UserLoginModel>, ApiResponse>(auth.protect({}), async (req, res) => {
  res.json(req.user);
});

export default router;
