// User

export type UserCreateDto = {
  email: string;
  password: string;
};

export type UserLoginDto = {
  email: string;
  password: string;
};

export type UserAuthPayload = { id: string; email: string };

// Survey

export type SurveyStepDto = {
  type: 'input' | 'multichoice';
  question: string;
};

export type SurveyCreateDto = {
  name: string;
  description?: string;
  step: SurveyStepDto;
};

export type SurveyPreviewDto = {
  id: string;
  name: string;
  key: string;
  description?: string;
};

export type SurveyDetailModel = SurveyPreviewDto & {
  step: SurveyStepDto;
};
