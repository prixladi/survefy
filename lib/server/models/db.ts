import { Mongoose } from 'mongoose';
import { sleep } from '~lib/utils';

import config from '../config';

export const mongoose = new Mongoose(config.db.options);

mongoose.set('autoIndex', true);

export const dbInit = async () => {
  mongoose.connection.on('connecting', () => {
    console.log('Connecting to MongoDB...');
  });

  mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ('${config.db.url}').`);
  });

  while (true) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await mongoose.connect(config.db.url, config.db.connectOptions);

      mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error: ', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected');
      });

      break;
    } catch (err) {
      console.error('Mongoose initial connection error: ', err);
      // eslint-disable-next-line no-await-in-loop
      await sleep(4000);
    }
  }
};
