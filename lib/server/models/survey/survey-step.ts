import { Model } from 'mongoose';

import { mongoose } from '../db';
import surveyStepType from './survey-step-type';

const { Schema } = mongoose;

export type SurveyStepAttributes = {
  question: string;
  type: keyof typeof surveyStepType;
};

export type SurveyStepModel = Model<SurveyStepAttributes>;

export const surveyStepSchema = new Schema<SurveyStepAttributes, SurveyStepModel>({
  question: {
    type: String,
    required: [true, 'Question field is required'],
  },
  type: {
    type: String,
    required: [true, 'Type field is required'],
    enum: Object.keys(surveyStepType)
  },
});
