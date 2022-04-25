import nc from 'next-connect';

import session from '~lib/server/session';
import { ApiRequest, ApiResponse } from '~lib/server/types';
import { UserLoginDto } from '~types';

const router = nc();

router.post<ApiRequest<UserLoginDto>, ApiResponse>(async (_, res) => {
  await session.destroyLoginSession(res);
  res.status(204).end();
});

export default router;
