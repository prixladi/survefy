import axios from 'axios';
import { useMutation } from 'react-query';

import { UserLoginModel } from '~types';

type Response = { status: 'ok'; data: any } | { status: 'badRequest'; data?: undefined };

export default function useUserLogin() {
  return useMutation(async (model: UserLoginModel): Promise<Response> => {
    const { status, data } = await axios.post('/api/auth/login', model, {
      validateStatus: (st) => st < 300 || st === 400,
    });

    if (status === 400) return { status: 'badRequest' };

    return { status: 'ok', data };
  });
}
