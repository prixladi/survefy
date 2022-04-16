import { Mongoose } from 'mongoose';
import config from '../config';

export const mongoose = new Mongoose();

mongoose.set('autoIndex', true);

export const dbInit = async () => {
  await mongoose.connect(config.db.url);
  console.log(`Connected to MongoDB: ${config.db.url}`);
};
