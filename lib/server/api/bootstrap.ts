import type { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { dbInit } from '../models/db';

type BootstrapItem = 'DB';
type Options = Partial<Record<BootstrapItem, boolean>>;

const tasks = {} as Partial<Record<BootstrapItem, Promise<void>>>;

const booststrapMiddleware =
  (opt: Options) => async (_: NextApiRequest, __: NextApiResponse, next: NextHandler) => {
    if (opt.DB && tasks.DB) {
      await tasks.DB;
    }

    next();
  };

export const bootstrap = (opt: Options) => {
  if (opt.DB && !tasks.DB) {
    tasks.DB = dbInit();
  }

  return booststrapMiddleware(opt);
};

export default bootstrap;
