import { NextApiRequest, NextApiResponse } from 'next';

import { UserAuthPayload } from '~types';

export type ApiRequest<T = any> = Omit<NextApiRequest, 'body'> & {
  body: T;
  user: UserAuthPayload;
  session: any;
};
export type ApiResponse<T = any> = NextApiResponse<T>;
