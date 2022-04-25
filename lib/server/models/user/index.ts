import { Model, HydratedDocument } from 'mongoose';

import { mongoose } from '../db';

import validatePassword from './methods/validate-password';

import fromRaw from './statics/from-raw';
import hashPassword from './statics/hash-password';
import normalizeEmail from './statics/normalize-email';

const { Schema } = mongoose;

export type UserAttributes = {
  email: string;
  passwordHash: string;
};

type UserMethods = {
  validatePassword: typeof validatePassword;
};

type UserStatics = {
  hashPassword: typeof hashPassword;
  normalizeEmail: typeof normalizeEmail;
  fromRaw: typeof fromRaw;
};

export type UserModel = Model<UserAttributes, Record<string, never>, UserMethods> & UserStatics;

export type User = HydratedDocument<UserAttributes, UserMethods>;

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

schema.method('validatePassword', validatePassword);

schema.static('hashPassword', hashPassword);
schema.static('normalizeEmail', normalizeEmail);
schema.static('fromRaw', fromRaw);

export const userCollection = 'users';
export const User = mongoose.model<UserAttributes, UserModel>('User', schema, userCollection);
