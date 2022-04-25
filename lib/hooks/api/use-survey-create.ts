import axios from 'axios';
import { useMutation } from 'react-query';

import { SurveyCreateDto, SurveyDetailModel } from '~types';

type Response =
  | { status: 'ok'; data: SurveyDetailModel }
  | { status: 'conflict'; data?: undefined }
  | { status: 'serverError'; data?: undefined };

const useSurveyCreate = () =>
  useMutation(async (model: SurveyCreateDto): Promise<Response> => {
    const { status, data } = await axios.post('/api/surveys', model, {
      validateStatus: () => true,
    });

    if (status === 409) return { status: 'conflict' };
    if (status >= 300) return { status: 'serverError' };

    return { status: 'ok', data };
  });

export default useSurveyCreate;
