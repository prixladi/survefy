import nc from 'next-connect';

import session from '~lib/server/session';
import { ApiRequest, ApiResponse } from '~lib/server/types';
import { UserLoginModel } from '~types';

const router = nc();

router.post<ApiRequest<UserLoginModel>, ApiResponse>(async (_, res) => {
  await session.destroyLoginSession(res);
  res.status(204).end();
});

export default router;
