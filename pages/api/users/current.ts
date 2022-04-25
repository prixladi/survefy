import nc from 'next-connect';

import auth from '~lib/server/api/auth';
import { ApiRequest, ApiResponse } from '~lib/server/types';
import { UserLoginDto } from '~types';

const router = nc();

router.get<ApiRequest<UserLoginDto>, ApiResponse>(auth.protect({}), async (req, res) => {
  res.status(200).json(req.user);
});

export default router;
