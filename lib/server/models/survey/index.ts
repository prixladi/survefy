import { Model, HydratedDocument } from 'mongoose';
import { ObjectId } from 'mongodb';

import { mongoose } from '../db';
import { SurveyStepAttributes, surveyStepSchema } from './survey-step';

const { Schema } = mongoose;

export type SurveyAttributes = {
  userId: ObjectId;
  name: string;
  description?: string;
  key: string;
  steps: SurveyStepAttributes[];
};

export type SurveyModel = Model<SurveyAttributes>;

export type Survey = HydratedDocument<SurveyAttributes>;

const schema = new Schema<SurveyAttributes, SurveyModel>({
  name: {
    type: String,
    required: [true, 'Name field is required'],
  },
  userId: {
    type: ObjectId,
    required: [true, 'UserId field is required'],
  },
  description: { type: String, unique: true },
  key: {
    type: String,
    required: [true, 'Key field is required'],
  },
  steps: [surveyStepSchema],
});

export const surveysCollection = 'surveys';
export const Survey = mongoose.model<SurveyAttributes, SurveyModel>(
  'Survey',
  schema,
  surveysCollection,
);
