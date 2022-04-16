import { NextApiRequest, NextApiResponse } from 'next';

export type ApiRequest<T = any> = Omit<NextApiRequest, 'body'> & { body: T };
export type ApiResponse<T = any> = NextApiResponse<T>;
