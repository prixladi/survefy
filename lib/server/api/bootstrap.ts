import type { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { sleep } from '~lib/utils';

import { dbInit } from '../models/db';

type BootstrapItem = 'DB';
type Options = Partial<Record<BootstrapItem, boolean>>;

const tasks = {} as Partial<Record<BootstrapItem, Promise<void>>>;
const bootstrapTimeoutMs = 5 * 1000;

const booststrapMiddleware =
  (opt: Options) => async (_: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const promises = [] as Promise<any>[];

    if (opt.DB && tasks.DB) {
      promises.push(tasks.DB);
    }

    let timeouted = false;
    if (promises.length) {
      const all = Promise.all(promises);
      const timeout = new Promise(async (res) => {
        await sleep(5000);
        timeouted = true;
        res(null);
      });

      await Promise.race([all, timeout]);

      if (timeouted) {
        return res
          .status(503)
          .json({ message: `Timeout '${bootstrapTimeoutMs}' in bootstrap reached.` });
      }
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
