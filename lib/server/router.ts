// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Options = {
  requireAuth: boolean;
};

type Handler = (req: NextApiRequest, res: NextApiResponse) => any;

export default function handlerWrapper(options: Options, handler: Handler) {
  return (req: NextApiRequest, res: NextApiResponse) => handler(req, res);
}
