import axios from 'axios';
import { useMutation } from 'react-query';

import { UserLoginModel } from '~types';

type Response =
  | { status: 'ok'; data: any }
  | { status: 'badRequest'; data?: undefined }
  | { status: 'serverError'; data?: undefined };

const useUserLogin = () =>
  useMutation(async (model: UserLoginModel): Promise<Response> => {
    const { status, data } = await axios.post('/api/auth/login', model, {
      validateStatus: () => true,
    });

    if (status === 400 || status === 401) return { status: 'badRequest' };
    if (status >= 300) return { status: 'serverError' };

    return { status: 'ok', data };
  });

export default useUserLogin;
