import { Mongoose } from 'mongoose';

export const mongoose = new Mongoose();

mongoose.set('autoIndex', true);

export const dbInit = async () => {
  await mongoose.connect(process.env.MONGO_URL as string);
};
