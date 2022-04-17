import axios from 'axios';
import { useMutation } from 'react-query';

import { UserCreateModel } from '~types';

type Response =
  | { status: 'ok'; data: any }
  | { status: 'conflict'; data?: undefined }
  | { status: 'serverError'; data?: undefined };

export default function useUserCreateMutation() {
  return useMutation(async (model: UserCreateModel): Promise<Response> => {
    const { status, data } = await axios.post('/api/users', model, {
      validateStatus: () => true,
    });

    if (status === 409) return { status: 'conflict' };
    if (status >= 300) return { status: 'serverError' };

    return { status: 'ok', data };
  });
}
