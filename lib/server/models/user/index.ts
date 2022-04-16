import { Model, HydratedDocument } from 'mongoose';

import { mongoose } from '../db';

import fromRaw from './statics/from-raw';
import hashPassword from './statics/hash-password';
import normalizeEmail from './statics/normalize-email';

const { Schema } = mongoose;

type UserAttributes = {
  email: string;
  passwordHash: string;
};

type UserStatics = {
  hashPassword: typeof hashPassword;
  normalizeEmail: typeof normalizeEmail;
  fromRaw: typeof fromRaw;
};

export type UserModel = Model<UserAttributes> & UserStatics;

export type User = HydratedDocument<UserAttributes>;

// create user model
const schema = new Schema<UserAttributes, UserModel>({
  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password hash field is required'],
  },
});

schema.static('hashPassword', hashPassword);
schema.static('normalizeEmail', normalizeEmail);
schema.static('fromRaw', fromRaw);

export const userCollection = 'users';
export const User = mongoose.model<UserAttributes, UserModel>('User', schema, userCollection);
