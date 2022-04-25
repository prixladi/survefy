import { randomBytes } from 'crypto';
import joi from 'joi';
import nc from 'next-connect';

import { bootstrap } from '~lib/server';
import auth from '~lib/server/api/auth';
import validation from '~lib/server/api/validation';
import { Survey } from '~lib/server/models';
import surveyStepType from '~lib/server/models/survey/survey-step-type';
import { ApiRequest, ApiResponse } from '~lib/server/types';
import { SurveyCreateDto, SurveyPreviewDto } from '~types';

const router = nc();

const bodySchema = {
  name: joi.string().required(),
  description: joi.string(),
  step: joi
    .object()
    .keys({
      question: joi.string().required(),
      type: joi.string().valid(...Object.keys(surveyStepType)).required(),
    })
    .required(),
};

router.post<ApiRequest<SurveyCreateDto>, ApiResponse>(
  bootstrap({ DB: true }),
  validation({ body: bodySchema }),
  auth.protect({}),
  async (req, res) => {
    if ((await Survey.countDocuments({ userId: req.user.id })) >= 50) {
      return res.status(409).json({
        message: 'User can only have 50 surveys at a time',
      });
    }

    const { step, ...rest } = req.body;
    const key = randomBytes(10).toString('hex');
    const survey = new Survey({ ...rest, key, userId: req.user.id, steps: [step] });
    await survey.save();
    return res.status(200).json(survey.toObject());
  },
);

router.get<ApiRequest, ApiResponse<SurveyPreviewDto[]>>(
  bootstrap({ DB: true }),
  validation({ body: bodySchema }),
  auth.protect({}),
  async (req, res) => {
    const surveys = (await Survey.find({ userId: req.user.id })) as Survey[];

    const previews = surveys.map((survey) => {
      const { _id, name, key, description } = survey.toObject();
      return { id: _id.toString(), name, key, description };
    });

    return res.status(200).json(previews);
  },
);

export default router;
