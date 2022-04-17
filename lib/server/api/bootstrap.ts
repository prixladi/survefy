import type { NextApiRequest, NextApiResponse } from 'next';
import { NextHandler } from 'next-connect';

import { sleep } from '~lib/utils';

import config from '../config';
import { dbInit } from '../models/db';

type BootstrapItem = 'DB';
type Options = Partial<Record<BootstrapItem, boolean>>;

const tasks = {} as Partial<Record<BootstrapItem, Promise<void>>>;

const booststrapMiddleware =
  (opt: Options) => async (_: NextApiRequest, res: NextApiResponse, next: NextHandler) => {
    const promises = [] as Promise<any>[];

    if (opt.DB && tasks.DB) {
      promises.push(tasks.DB);
    }

    let timeouted = false;
    if (promises.length) {
      const all = Promise.all(promises);
      const timeout = new Promise((resolve, reject) => {
        sleep(5000)
          .then(() => {
            timeouted = true;
            resolve(null);
          })
          .catch(() => reject());
      });

      await Promise.race([all, timeout]);

      if (timeouted) {
        return res
          .status(503)
          .json({ message: `Timeout ${config.bootstrap.timeoutMS}ms in bootstrap reached.` });
      }
    }

    return next();
  };

export const bootstrap = (opt: Options) => {
  if (opt.DB && !tasks.DB) {
    tasks.DB = dbInit();
  }

  return booststrapMiddleware(opt);
};

export default bootstrap;
