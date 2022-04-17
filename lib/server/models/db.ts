import { Mongoose } from 'mongoose';
import { sleep } from '~lib/utils';

import config from '../config';

export const mongoose = new Mongoose();

mongoose.set('autoIndex', true);

export const dbInit = async () => {
  mongoose.connection.on('connecting', function () {
    console.log('Connecting to MongoDB...');
  });

  mongoose.connection.on('connected', function () {
    console.log(`Connected to MongoDB ('${config.db.url}').`);
  });

  while (true) {
    try {
      await mongoose.connect(config.db.url, config.db.options);

      mongoose.connection.on('error', function (err) {
        console.error('Mongoose connection error: ', err);
      });

      mongoose.connection.on('disconnected', function () {
        console.log('Mongoose connection disconnected');
      });

      break;
    } catch (err) {
      console.error('Mongoose initial connection error: ', err);
      await sleep(4000);
    }
  }
};
